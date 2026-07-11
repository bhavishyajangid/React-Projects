import { Client, Account, ID , Databases , Storage , Query } from "appwrite";
import conf from '../config/config.js'


export class cartService{
    client = new Client();
    Database;
    

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.Database = new Databases(this.client);
    }

    async addToCart ({userId, productId, title, image, price, quantity, size}) {
        
         try {
                return await this.Database.createDocument(
                    conf.appwriteDatabaseId, 
                    conf.appwriteCollectionId, 
                    ID.unique(),
                        {
                          userId,
                          productId,
                          title, 
                          image,
                          price,
                          quantity,
                          size
                         }
                )
         } catch (error) {
             console.log(error);
             throw error;
         }
    }

    async updateCart ({quantity, Id}) {
        console.log(quantity, Id);
        try {
            return await this.Database.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                Id ,
               {
                  quantity
                }
            )
     } catch (error) {
         return error
     }
    }


    async deleteCart (id) {
        try {
           await this.Database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id 
            )
            return true
        } catch (error) {
            return false
        }
    }


    async getProduct ({id}) {
     try {
        return await this.Database.getDocument(
            conf.appwriteDatabaseId, 
            conf.appwriteCollectionId, 
            id
        )
     } catch (error) {
          return error
     }
    }

    async getCarts(userId){
        try {
            return await this.Database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('userId', String(userId))]    
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}

export default  cartService = new cartService()
