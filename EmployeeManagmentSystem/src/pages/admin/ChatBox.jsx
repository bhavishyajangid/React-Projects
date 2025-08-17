import { memo, useCallback, useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import messageServices from "../../Appwrite/Message";
import MessageSkeleton from "../../components/skeleton/MessageSkeleton";
import conf from "../../config/config";
import { Message } from "../../export";
import { addUnseenMessage, setChatOpen, setUnseenMessage } from "../../Store/chatBoxSlice";

// Utility Functions
const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatTime = (isoDate) =>
  new Date(isoDate).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const ChatBox = () => {
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const { isOpen, user, unseenMessage } = useSelector(
    (state) => state.chatBoxSlice
  );
  const [messages, setMessages] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const subscriptionRef = useRef(null);

  const isAdmin = currentUserDetails.admin;
  const currentUserId = isAdmin ? "admin" : currentUserDetails.userName;
  const targetUserId = isAdmin ? user.AssignTo || user.userName : "admin";

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const text = inputRef.current.value.trim();
    if (!text) return toast.error("Can't send empty message");

    try {
      await messageServices.sendMessage({
        senderId: currentUserId,
        receiverId: targetUserId,
        message: text,
        sender: currentUserDetails.userName,
        seenByReceiver: false,
      });
      inputRef.current.value = "";
    } catch (err) {
      toast.error("Failed to send message");
      console.error(err);
    }
  };

  const deleteMessage = useCallback(async (id) => {
    setLoading(true);
    try {
      await messageServices.deleteMessage(id);
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);

      try {
        const data = await messageServices.allMessage(currentUserDetails, user);
        console.log(data , 'allmessage');
        
        if (data) setMessages(data);

        subscriptionRef.current = messageServices.client.subscribe(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteMessageCollectionId}.documents`,
          (res) => {
            const newMsg = res.payload;
        
            if (
              res.events.includes("databases.*.collections.*.documents.*.create")
            ) {  

              
              dispatch(addUnseenMessage(newMsg))
              setMessages((prev) => [...prev, newMsg]);
              
            }
        
            if (
              res.events.includes("databases.*.collections.*.documents.*.delete")
            ) {
              setMessages((prev) =>
                prev.filter((msg) => msg.$id !== newMsg.$id)
              );
            }
        
            if (
              res.events.includes("databases.*.collections.*.documents.*.update")
            ) {
              dispatch(setUnseenMessage([]))
              setMessages((prev) =>
                prev.map((msg) => (msg.$id === newMsg.$id ? newMsg : msg))
              );

            }
          }
        );        
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };



   const updateAllUnseenMessage = async() => {
     
     try {
       for (const message of unseenMessage) {
          console.log(message.sender , currentUserDetails , 'adsfjbd');
          if(message.sender !== currentUserDetails.userName){
            console.log("wrokign");
            await messageServices.updateTheUnseenMessage(message);
          }
        }
      } catch (error) {
        console.error(error, "error while updating unseen messages");
      }
    }

  if (isOpen){
    loadMessages();
  } 

  if(isOpen && unseenMessage.length >= 0 ){
    updateAllUnseenMessage();
  }


    return () => {
      if (subscriptionRef.current) subscriptionRef.current(); // unsubscribe
    };
  }, [user, isOpen]);

  const renderMessages = () => {
    if (loading) return <MessageSkeleton />;

    if (!messages.length)
      return <p className="text-center text-gray-500 mt-20">No messages</p>;

    return messages.map((msg, index) => {
      const showDate =
        index === 0 ||
        formatDate(msg.$createdAt) !==
          formatDate(messages[index - 1].$createdAt);

      return (
        <Message
          key={msg.$id}
          item={msg}
          deleteMessage={deleteMessage}
          showDate={showDate}
          date={formatDate(msg.$createdAt)}
          time={formatTime(msg.$createdAt)}
        />
      );
    });
  };

  return (
    <div className="w-full flex justify-end max-sm:justify-center items-end">
      <div
        className={`fixed max-sm:w-11/12 -bottom-[455px] w-[370px] bg-white shadow-xl rounded-lg overflow-hidden transition-transform duration-300 ${
          isOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between py-3 px-5 bg-blue-600 text-white">
          <span className="font-semibold text-lg">
            Chat with {isAdmin ? user.AssignTo || user.userName : "admin"}
          </span>
          <MdCancel
            onClick={() => dispatch(setChatOpen({ isOpen: false, user: {} }))}
            className="cursor-pointer text-xl"
          />
        </div>

        <div
          ref={scrollRef}
          className="px-3 py-2 h-[330px] overflow-y-auto space-y-4 relative"
        >
          {renderMessages()}
        </div>

        <div className="p-4 bg-gray-200 flex items-center space-x-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="w-full px-3 py-2 rounded-lg bg-white border text-black text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatBox);
