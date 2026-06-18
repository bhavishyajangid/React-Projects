import { Client, Storage, ID } from "appwrite";
import conf from "../config/config";

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.storage = new Storage(this.client);
    }


    // ===========================
    // Upload Single Image
    // ===========================

    async uploadImage(file) {
        try {
            const response = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

            return response;
        } catch (error) {
            console.error("Upload Error:", error);
            throw error;
        }
    }


    // ===========================
    // Upload Multiple Images
    // ===========================

    async uploadMultipleImages(files) {
        try {

            const uploadedImages = await Promise.all(

                files.map(file =>
                    this.uploadImage(file)
                )

            );

            return uploadedImages;

        } catch (error) {
            console.error("Multiple Upload Error:", error);
            throw error;
        }
    }



    // ===========================
    // Get Preview URL
    // ===========================

    getImagePreview(fileId) {

        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );

    }



    // ===========================
    // Get Original Image URL
    // ===========================

    getImageView(fileId) {

        return this.storage.getFileView(
            conf.appwriteBucketId,
            fileId
        );

    }



    // ===========================
    // Delete Image
    // ===========================

    async deleteImage(fileId) {

        try {

            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );

            return true;

        } catch (error) {

            console.error("Delete Error:", error);

            throw error;
        }

    }



    // ===========================
    // List Images
    // ===========================

    async listImages() {

        try {

            const response = await this.storage.listFiles(
                conf.appwriteBucketId
            );

            return response.files;

        } catch (error) {

            console.error("List Error:", error);

            throw error;
        }

    }
}


const storageService = new StorageService();

export default storageService;