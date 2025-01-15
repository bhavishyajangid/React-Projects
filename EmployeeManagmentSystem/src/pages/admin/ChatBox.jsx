import React, { memo, useEffect, useRef, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import messageServices from '../../Appwrite/Message';
import { Message } from '../../export';
import MessageSkeleton from '../../components/skeleton/MessageSkeleton';
import { toast } from 'react-toastify';
import { setChatOpen } from '../../Store/chatBoxSlice';
const ChatBox = () => {
    const {currentUserDetails} = useSelector(state => state.authSlice)
    const {isOpen , user} = useSelector(state => state.chatBoxSlice)
    const [message , setMessage] = useState([])
    const inputValue = useRef("")
    const [skeleton , setSkeleton] = useState(true)
    const scrollContainerRef = useRef(null);
    const dispatch = useDispatch()


    const messageSend = async() => {
        const messageText = inputValue.current.value.trim();
        if (!messageText) return; // Don't send empty messages
    
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get the current time for the message
              try {
                 const sendMessage = await messageServices.sendMessage({
                     senderId : currentUserDetails.userId,
                     receiverId : currentUserDetails.admin ? user.userId : "677a349e0012e5528e6f" ,
                     time : time,
                     message : messageText,
                     sender :  user.admin ? "admin" : "employee"
                 })

                if(sendMessage){
                      setMessage([...message , sendMessage])
                }
                 
              } catch (error) {
                toast.error(`failed to send message`)
                console.log(error);
                
              }
        
              inputValue.current.value = ""
        
    }

    useEffect(() => {
      // Scroll to the bottom whenever the component is rendered or updated
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, [message]);

    useEffect(() => {
          const allMessage = async() => {
                 setSkeleton(true)
                  try {
                     const data = await messageServices.allMessage(currentUserDetails , user)
                     if(data){
                      setMessage(data.documents)
                     }  
                  } catch (error) {
                    console.log(error);
                    toast.error("failed to fetch message" , error)
                    
                  }finally{
                    setSkeleton(false)
                  }
          }
       if(isOpen){
         allMessage()
       }
          
    }, [user , isOpen])
    
  return (
    
    <div className='w-full    flex justify-end max-sm:justify-center items-end'>

  <div class={`fixed max-sm:w-11/12 -bottom-[455px] w-[370px]  bg-white shadow-xl rounded-lg overflow-hidden transition-transform duration-300  ${isOpen ?  "-translate-y-full" : "translate-y-0"}`}>
    
    {/* <!-- Chat Header --> */}
    <div class="flex items-center justify-between py-3 px-5 bg-blue-600 text-white">
      <span class="font-semibold text-lg">Chat with {user.userName}</span>
      <MdCancel onClick={() => {dispatch(setChatOpen({isOpen : false , user : {}}))}} className=' cursor-pointer text-xl' />
    </div>

    {/* <!-- Chat Content --> */}
    <div ref={scrollContainerRef} class="px-3 py-2 h-[330px] overflow-y-auto space-y-4 relative">
      
      


      {
         skeleton ? <MessageSkeleton/> :
        message?.map((item) => (
          <Message key={item.$id} item={item}/>
        ))  
      }

      

    </div>

    {/* <!-- Message Input --> */}
    <div class="p-4 bg-gray-200 flex items-center space-x-4">
      <input ref={inputValue} type="text" placeholder="Type a message..." class="w-full px-3 py-2 rounded-lg bg-white border text-black text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <button onClick={() => {messageSend()}} class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Send
      </button>
    </div>
    
  </div>

    </div>
  )
}

export default memo(ChatBox) 