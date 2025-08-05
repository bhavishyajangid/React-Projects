import { Client, Databases, ID } from "appwrite";
import conf from "../config/config";

export class attendenceService{
    client = new Client() 
    attendence

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.attendence = new Databases(this.client)
    }


    async setAttendence (data){
    try {
        const result = await this.attendence.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteAttendenceCollectionId,
            ID.unique(),
            data
        )
      return result
    } catch (error) {
        throw error
    }
    }

}

const attendenceServices = new attendenceService()
export default attendenceServices