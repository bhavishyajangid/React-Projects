import { Client, Databases, ID, Query , } from "appwrite";
import conf from "../config/config";
import { login } from "../Store/authSlice";
import { current } from "@reduxjs/toolkit";
import dataBaseServices from "./Database";


export class MessageService {
    client = new Client();
    Message

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Message = new Databases(this.client)
    }


 async sendMessage({senderId , receiverId , message , seenByReceiver , sender}){
  
       try {
          const setMessage = await this.Message.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteMessageCollectionId,
            ID.unique(),

            {
                senderId,
                receiverId,
                message,
                seenByReceiver ,
                sender
            }
          )
     
          
          if(setMessage){
             return  setMessage
          }
       } catch (error) {
        console.error('Error sending message:', error);
       }


       
 }

 async allMessage(currentUser, receiver) {
  const senderId = currentUser.admin ? "admin" : currentUser.userName;
  const receiverId = currentUser.admin ? receiver.AssignTo || receiver.userName : "admin"
  

  try {
  

    // First fetch: sender → receiver
    const res1 = await this.Message.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteMessageCollectionId,
      [
        Query.equal("senderId", senderId),
        Query.equal("receiverId", receiverId),
      ]
    );

    // Second fetch: receiver → sender
    const res2 = await this.Message.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteMessageCollectionId,
      [
        Query.equal("senderId", receiverId),
        Query.equal("receiverId", senderId),
      ]
    );

    // Merge both message arrays
    const combined = [...res1.documents, ...res2.documents];

    // Sort messages by creation time
    combined.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));

    return combined;

  } catch (error) {
    console.error("Error while fetching messages:", error);
    return [];
  }
}



 async deleteMessage(messageId) {
  try {
    await this.Message.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteMessageCollectionId,
      messageId
    );
    return true;
  } catch (error) {
    console.error("Failed to delete message:", error);
    return false;
  }
}

async unseenMessage(receiverId){
  console.log(receiverId , "receiverId");
  
    try {
         const message = await this.Message.listDocuments(
           conf.appwriteDatabaseId, 
           conf.appwriteMessageCollectionId,
           [
            Query.equal("receiverId", receiverId), 
            Query.equal("seenByReceiver", false)
           ]
         )  
       

         
          return message.documents
    } catch (error) {
        console.error('error occur in unseenmessage' , error)
        return []
    }
}

async updateTheUnseenMessage(message){
  try {
    await this.Message.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteMessageCollectionId,
      message.$id,
      { seenByReceiver: true }
     )
  
     return true
  } catch (error) {
    console.error('error occur to updateTheUnseenMessage' , error)
    return false
  }
   
}

}

const messageServices = new MessageService
export default messageServices