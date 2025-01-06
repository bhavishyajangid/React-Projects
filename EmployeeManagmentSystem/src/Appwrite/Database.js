import { Client , Databases, ID , Query} from "appwrite";
import conf from "../config/config";
export class databaseServices{
    client = new Client();
    database;

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client)
    }


     async setUserProfileData({username ,number , isEmailVerify, email , id}){
        console.log(username ,number , isEmailVerify, email , id);
        
        try {
            const userPersonalData = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAuthCollectionId,
                ID.unique() , 
                {
                    userId : String(id),
                    userName : String(username),
                    email : String(email),
                    number : String(number),
                    isEmailVerify : Boolean(isEmailVerify)
                }  
            )
            return userPersonalData
        } catch (error) {
            console.log(error);
            
        }
     }

     async getUserDetails(indentifier , queryType = "userId") {
      
      if (!["userId", "userName"].includes(queryType)) {
        throw new Error("Invalid query type. Must be 'userId' or 'userName'.");
    }
        try {
          const userDetails = await this.database.listDocuments(
            conf.appwriteDatabaseId,  // Your database ID
            conf.appwriteAuthCollectionId,  // Your collection ID
            [Query.equal(queryType, indentifier)]  // Query to find the user by userId
          );
          return userDetails.documents[0];  // Return the first document (user)
        } catch (error) {
          console.log(error);
          return null;  // In case of error or no user found
        }
      }
}

const dataBaseServices = new databaseServices();
export default dataBaseServices