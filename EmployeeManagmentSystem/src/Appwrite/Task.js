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

    
    unsubscribeFromTasks(subscription) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }

    async setTask({Tittle , Date , AssignTo , Category , Description , Urgent}){
      
          const employee = await dataBaseServices.getUser(AssignTo , "userName")
         
          console.log(employee , "employee");
          
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
                    TaskId : employee.userId,
                    status : "new"
                }  
            )

            return userPersonalData || null;
            
        } catch (error) {
            console.log("error occure in setTask" , error);
            throw new Error("Appwrite internal error");
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
        console.log(allTask , "alltask");
        
        if(allTask){
          
          return allTask
        }
      } catch (error) {
          return error  
      }
   }

    async getUserTask(TaskId) { 
      console.log("working");
      
      console.log(TaskId , "taskid");
      
        try {
          const userDetails = await this.Task.listDocuments(
            conf.appwriteDatabaseId,  // Your database ID
            conf.appwriteAllTaskCollectionId,  // Your collection ID
            [Query.equal("TaskId", TaskId )]  // Query to find the user by userId
          );
          
          return userDetails.documents;  // Return the first document (user)
        } catch (error) {
          console.log(error);
          throw new Error(error)  // In case of error or no user found
        }
      }
   
     // In TaskServices
async deleteTask(documentId) {
  try {
    // Use Appwrite's deleteDocument method
    const deletedTask = await this.Task.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteAllTaskCollectionId, 
      documentId
    );

    // Check if deletion was successful
    if (deletedTask) {
      console.log(deletedTask, 'core');
      
      return deletedTask;
    } else {
      return false;  
    }
  } catch (error) {
    console.error('Error in deleteTask service:', error);
  }
}


 async getSingleTask (documentId){
  
       try {
           const task = this.Task.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteAllTaskCollectionId,
            documentId
           )

           if(task){
            return task
           }
           
       } catch (error) {
        console.log(error);
        
       }
 }

 async updateTask (documentId , task){

  
  try {
    const updatedTask = this.Task.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteAllTaskCollectionId,
      documentId,
      task
    )
    if(updatedTask){
       return updatedTask
    }
    
  } catch (error) {
    throw new Error(error)
  }
 }
}

const TaskServices = new taskService();

export default TaskServices