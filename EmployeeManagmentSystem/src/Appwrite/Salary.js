import { Client, Databases , Query , ID } from "appwrite";
import conf from "../config/config";
import { editUser } from "../Store/thunks/userThunk";

export class salaryService {
  client = new Client();
  salary;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.salary = new Databases(this.client);
  }

  async addSalary(data) {
    try {
      const result = await this.salary.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteSalaryCollectionId,
        ID.unique(),
        data
      );
      return result || [];
    } catch (error) {
      throw error || "failed to add salary";
    }
  }

  async fetchSalaryHistory(userId) {
    console.log(userId);

    try {
      const salary = await this.salary.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteSalaryCollectionId,
        [Query.equal("employeeId", userId)]
      );

      return salary ? salary.documents : [];
    } catch (error) {
      console.log(error);

      throw error.message || "failed to fetch salary details";
    }
  }

  async filterSalary({ startDate, endDate }) {
    
    let query = [];

    if (startDate) {
      query.push(Query.greaterThanEqual("payDate", startDate));
    }

    if (endDate) {
      query.push(Query.lessThanEqual("payDate", endDate));
    }

    try {
      const res = await this.salary.listDocuments (
        conf.appwriteDatabaseId,
        conf.appwriteSalaryCollectionId,
        query
      );

      return res.documents || [];
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message || "Something Went Wrong Try After Some Time"
      );
    }
  }
}


const SalaryServices = new salaryService

export default SalaryServices