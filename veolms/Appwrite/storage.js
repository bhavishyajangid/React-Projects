import { Client, Storage, ID } from "appwrite";
import conf from "../config/config";

export class storageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async createFile(filePath) {
    try {
      const result = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        filePath
      );

      if (result) {
        // ✅ Use getFileView() instead of getFilePreview()
        const fileUrl = this.storage.getFileView(conf.appwriteBucketId, result.$id);
        return { fileId: result.$id, fileUrl: fileUrl };
      }
    } catch (error) {
      console.log(error, 'error while creating file');
      throw error;
    }
  }
}

const storageServices = new storageService();
export default storageServices;
