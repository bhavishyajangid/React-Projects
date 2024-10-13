import config from "../config/config";
import { Client, Account, ID , Databases, Storage, Query } from "appwrite";

//making database and storage for our data
export class Service {
    Client = new Client();
    dataBase 
    bucket 

    constructor () {
        this.Client
        .setEndpoint(config.appwriteEndPoint)
        .setProject(config.appwriteProjectId)
        this.dataBase = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
    }

    // in this slug is the unique id of the post we can give this id name also
    async createPost ({tittle , slug , content , featuredImage , status , userId}) {
         try {
            return await this.dataBase.createDocument(
                config.appWriteDataBaseId ,
                config.appwriteCollectionId , 
                slug , 
                // send the new post data as object in the database
                {
                    tittle ,
                    content , 
                    featuredImage ,
                    userId , 
                    status
                }
            )
         } catch (error) {
            throw error
         }
    }

    async updatePost (slug ,{tittle , content , featuredImage , status}) {
        try {
            return await this.dataBase.updateDocument(
                config.appWriteDataBaseId ,
                config.appwriteCollectionId , 
                slug , 
                {
                    tittle ,
                    content , 
                    featuredImage ,
                    status
                }
            )
         } catch (error) {
            throw error
         }
    }

    async deletePost (slug) {
         try {
            const deletedPost =  await this.dataBase.deleteDocument(config.appWriteDataBaseId , config.appwriteCollectionId , slug)
             if(deletedPost){
                return true
             }else{
                false
             }
         } catch (error) {
            throw error
         }
    }

    async getPost(slug){
        try {
             return await this.dataBase.getDocument(config.appWriteDataBaseId , config.appwriteCollectionId , slug)
         } catch (error) {
            throw error
         }
    }
 
    // heres we get all the post from database
    async allPost () {
        try {
            return await this.dataBase.listDocuments(
                config.appWriteDataBaseId , 
                config.appwriteCollectionId,
                // we set here a query for post this mean only send this post which status is active you set more query like that
                [
                   Query.equal('status' , 'active')
                ]
            )
        } catch (error) {
            throw error
        }
    }

    // making file upload method

    async uploadFile(file) {
     try {
            return this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique() ,
                file ,
            )
     } catch (error) {
        throw error
     }
    }

    async deleteFile(fileId){
   try {
         await this.bucket.deleteFile(
            config.appWriteBucketId,
            fileId
        )
        return true
   } catch (error) {
    throw error
   }
    }

    getFilePreview (fileId) {
      return this.bucket.getFilePreview(
        config.appWriteBucketId , 
        fileId  
      )
    }
}

// return this class obj so we access all the methods
const service = new Service()  
export default service