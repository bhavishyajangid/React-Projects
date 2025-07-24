import { Client, Databases, Query , ID , Permission, Role } from "appwrite";
import conf from "../config/config";
import storageServices from "./storage";
export class leaveService{
    client = new Client()
    Leave

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Leave = new Databases(this.client)
    }


    async addLeave(data){
  let imageId = ""
   try {
         
                
    if (
      data.attachmentUrl &&
      data.attachmentUrl[0] &&
      data.attachmentUrl[0].size > 0
    ) {
      try {
        let result = await storageServices.createFile(data.attachmentUrl[0]);

        
        data.attachmentUrl = result.fileUrl;
        imageId = result.fileId;
      } catch (error) {
        throw new Error(error.message || "Unable to update profile image");
      }
    }

    
      const result = await this.Leave.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLeaveCollectionId,
        ID.unique(),
        data,
      )
      
      return result

   } catch (error) {
    if (imageId) {
        try {
          await storageServices.deleteFile(imageId);
        } catch (err) {
          console.warn("Failed to delete uploaded image:", err.message);
        }
      }
    console.log(error.message);
    
      throw error || 'Failed To Apply Leave Try After Some Time'
   }
}

async fetchLeaves(userId){
  console.log(userId);
  
  
  let query = userId ? [Query.equal("employeeId", userId)] : []
try {
  const result = await this.Leave.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteLeaveCollectionId,
    query
  )
console.log(result, 'rslfakdjs');

  return result.documents || []
} catch (error) {
  console.log(error);
  throw new Error(error.message || 'Failed To Fetch Leaves Try Again After Some Time')
  
}
}


 async filterLeaves(data){
 console.log(data);
 
  let query = []


         if(data.startDate){
            query.push(Query.greaterThanEqual('fromDate' , data.startDate))
         }

         if (data.endDate) {
            query.push(Query.lessThanEqual('toDate', data.endDate));
          }

          if(data.status){
             query.push(Query.equal('status' , data.status))
          }
   

    try {
      const result = await this.Leave.listDocuments(
         conf.appwriteDatabaseId,
         conf.appwriteLeaveCollectionId,
         query
         
      )

      console.log(result);
      
      return result.documents || []
    } catch (error) {
      console.log(error)
      throw new Error(error.message || "Failed To Filter Data")
    }
 }

 async fetchSingleLeave(leaveId){
   try {
    
    const leave = await this.Leave.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteLeaveCollectionId,
      leaveId
    )

    return leave || []
  
   } catch (error) {
    console.log(error);
    throw new Error( error.message || "enable to fetch leave")
    
   }
 }

 async updateLeave(leaveId , status){
    try {
       await this.Leave.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLeaveCollectionId,
        leaveId,
        {status : status}
      )
      return true
    } catch (error) {
      console.log(error);
      
       throw new Error(error.message || 'Failed To Update Leave Try Again After Some Time')
       
    }
 }



}

const LeaveServices = new leaveService()

export default LeaveServices