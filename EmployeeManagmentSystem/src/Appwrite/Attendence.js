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
      return result;
    } catch (error) {
      throw error;
    }
  }

  async checkAttendence(fingerprintId, todayDate, user) {
    console.log(fingerprintId, todayDate, user);

    try {
      const res = await this.attendence.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAttendenceCollectionId,
       [
    Query.equal("employeeId", user),
    Query.equal("date", todayDate)
  ]
      );
      console.log(res, "attendence found");

      return {AttendenceTotal : res.total , checkAttendenceDocument : res.documents}
    } catch (error) {
      throw error;
    }
  }

  async checkDevice(fingerprintId) {
    const todayDate = new Date().toLocaleTimeString("en-US", { hour12: true });
    try {
      const res = await this.attendence.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAttendenceCollectionId,
        [
    Query.equal("fingerprintId", fingerprintId),
    Query.equal("date", todayDate)
  ]
      );

      return {deviceTotal : res.total , checkDeviceDocument : res.documents}
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
