import { Client, Databases, ID, Query } from "appwrite";
import conf from "../config/config";

export class attendenceService {
  client = new Client();
  attendence;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.attendence = new Databases(this.client);
  }

  async setAttendence(data) {
    console.log(data);
    try {
      const result = await this.attendence.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAttendenceCollectionId,
        ID.unique(),
        data
      );
      console.log(result);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  async checkAttendence(userId) {
    const todayDate =  new Date().toISOString().slice(0, 10);
    console.log( todayDate, userId);
    try {
      const res = await this.attendence.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAttendenceCollectionId,
       [
    Query.equal("employeeId", userId),
    Query.equal("date", todayDate)
  ]
      );
      console.log(res, "attendence found");

      return res.documents[0]
    } catch (error) {
      throw error;
    }
  }

  async checkDevice(fingerprintId) {
    console.log(fingerprintId);
    
    const todayDate =  new Date().toISOString().slice(0, 10);
    try {
      const res = await this.attendence.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAttendenceCollectionId,
        [
    Query.equal("fingerprintId", fingerprintId),
    Query.equal("date", todayDate)
  ]
      );

      return {deviceTotal : res.total , checkDeviceDocument : res.documents[0]}
    } catch (error) {
      throw error;
    }
  }

  async updateTheAttendence(id) {
      const outTime = new Date().toLocaleTimeString("en-US", { hour12: true });
    try {
      const res = await this.attendence.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAttendenceCollectionId,
        id,
        {
         outTime,
          out: true,
        }
      );
      console.log(res);
      
      return res
    } catch (error) {
        throw error 
    }
  }
}

const attendenceServices = new attendenceService();
export default attendenceServices;
