import { Client , Databases , ID , Query } from "appwrite";
import conf from "../config/config";

export class taskService{
    client = new Client();
    Task

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Task = new Databases(this.client)
    }

    async setTask({Tittle , Date , AssignTo , Category , Description , Urgent , TaskId}){
        
        try {
            const userPersonalData = await this.Task.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAllTaskCollectionId,
                ID.unique() , 
                {
                    Tittle: String(Tittle),
                    Date : String(Date),
                    AssignTo : String(AssignTo),
                    Category : String(Category),
                    Description: String(Description),
                    isCompleted : false,
                    Urgent : Urgent,
                    TaskId : ID.unique()
                }  
            )
            return userPersonalData
        } catch (error) {
            console.log(error);
            
        }
     }



    async getUserDetails(userId) { 
        try {
          const userDetails = await this.database.listDocuments(
            conf.appwriteDatabaseId,  // Your database ID
            conf.appwriteAuthCollectionId,  // Your collection ID
            [Query.equal("userId", userId)]  // Query to find the user by userId
          );
          return userDetails.documents[0];  // Return the first document (user)
        } catch (error) {
          console.log(error);
          return null;  // In case of error or no user found
        }
      }
}

const TaskServices = new taskService();

export default TaskServices