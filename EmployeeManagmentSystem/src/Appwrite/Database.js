import { Client , Databases, ID , Query} from "appwrite";
import conf from "../config/config";
import { Identity } from "twilio/lib/twiml/VoiceResponse";
import TaskServices, { taskService } from "./Task";
export class databaseServices{
    client = new Client();
    database;

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client)
    }

    async emailIsExists(emailToCheck) {
      try {
        const response = await this.database.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteAuthCollectionId,
          [
            Query.equal("email", emailToCheck)
          ]
       )
        
      
       
       return response.documents.length > 0 ? true : false
      } catch (error) {
         console.log(error , "come when the chech email is exist");
         return false
         
      }
       


    }


     async setUserProfileData(profile){
      console.log(profile);
      
        // console.log(username ,number , isEmailVerify, email , id);
        
        try {
            const userPersonalData = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAuthCollectionId,
                ID.unique() , 
                profile
            )
            return userPersonalData
        } catch (error) {
          throw Error(error)
            
        }
     }

     async getUser(indentifier , queryType = "userId") {
        console.log(indentifier , queryType , "kahdfg");
        
      if (!["userId", "userName"].includes(queryType)) {
        throw new Error("Invalid query type. Must be 'userId' or 'userName'.");
    }
        try {
          const userDetails = await this.database.listDocuments(
            conf.appwriteDatabaseId,  // Your database ID
            conf.appwriteAuthCollectionId,  // Your collection ID
            [Query.equal(queryType, indentifier)]  // Query to find the user by userId
          );
          console.log(userDetails , "userDetail");
          
          return userDetails.documents[0] || [];  // Return the first document (user)
        } catch (error) {
          console.log("error occure in the getUser"  , error);
          return null;  // In case of error or no user found
        }
      }

      async getAllUser (){
         try {
           const allUserList = this.database.listDocuments(
             conf.appwriteDatabaseId,
             conf.appwriteAuthCollectionId,
            [ Query.equal("admin" ,false)]
           )

           if(allUserList){
              return allUserList
           }
         } catch (error) {
          console.log('error while fetching all user form database' , error);
          
         } 
      }
      async deleteUserFromDatabase(userId) {
        try {
            // Assuming you have a "users" collection and the userId is the document ID
            const response = await this.database.deleteDocument(
                conf.appwriteDatabaseId, // Replace with your database ID
                conf.appwriteAuthCollectionId, // Replace with your collection ID
                userId // User document ID to delete
            );
            console.log('User deleted from database:', response);
            return true; // Return true on success
        } catch (error) {
            console.error('Error deleting user from database:', error);
            throw new Error(error);
        }
    }



}

const dataBaseServices = new databaseServices();
export default dataBaseServices