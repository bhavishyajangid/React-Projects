import { Client, Databases, ID, Query } from "appwrite";
import conf from "../config/config";


export class MessageService {
    client = new Client();
    Message

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Message = new Databases(this.client)
    }


 async sendMessage({senderId , receiverId , message , time , sender}){
       try {
          const setMessage = this.Message.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteMessageCollectionId,
            ID.unique(),

            {
                senderId,
                receiverId,
                message,
                time,
                sender
            }
          )
          console.log('Message sent:', setMessage);
          if(setMessage){
             return  setMessage
          }
       } catch (error) {
        console.error('Error sending message:', error);
       }
 }

 async allMessage (sender , receiver){
    console.log(sender , receiver , "dagjk;ah");
    
     try {
         const message = await this.Message.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteMessageCollectionId,
            [
                Query.equal("senderId" , sender.userId),
                Query.equal('receiverId' , receiver.userId || "677a349e0012e5528e6f")
            ]
         )
         if(message){
            return message
         }
     } catch (error) {
        console.log("Error while fetching message" , error);
        
     }
 }




}

const messageServices = new MessageService
export default messageServices