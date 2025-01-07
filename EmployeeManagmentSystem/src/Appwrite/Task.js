import { Client , Databases , ID , Query } from "appwrite";
import conf from "../config/config";
import dataBaseServices from "./Database";

export class taskService{
    client = new Client();
    Task

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Task = new Databases(this.client)
    }

    async setTask({Tittle , Date , AssignTo , Category , Description , Urgent}){
      
          const employee = await dataBaseServices.getUser(AssignTo , "userName")
         
         if(employee && !employee.admin){
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
                    TaskId : employee.userId
                }  
            )
            console.log(userPersonalData);
            
            return userPersonalData
        } catch (error) {
            console.log(error);
            
        }
         }else{
           return false
         }

    }



    async getAllTask() {
      try { 
        const allTask = await this.Task.listDocuments(
           conf.appwriteDatabaseId,
           conf.appwriteAllTaskCollectionId
        );
        if(allTask){
          return allTask
        }
      } catch (error) {
          return error  
      }
   }

    async getUserTask(TaskId) { 
      
        try {
          const userDetails = await this.Task.listDocuments(
            conf.appwriteDatabaseId,  // Your database ID
            conf.appwriteAllTaskCollectionId,  // Your collection ID
            [Query.equal("TaskId", TaskId )]  // Query to find the user by userId
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