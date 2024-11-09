import { Client, Account, ID , Databases , Storage , Query } from "appwrite";
import conf from '../config/config.js'


export class Order{
    client = new Client();
    Database;
    

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.Database = new Databases(this.client);
    }

    async placeOrder({Id , Image , Price , Quantity , Tittle , Total , userId , Status , Method , Date}) {
           console.log(Id , Image , Price , Quantity , Tittle , Total , userId , Status , Method , Date);
           
         try {
                return await this.Database.createDocument(
                    conf.appwriteDatabaseId, 
                    conf.appwriteOrdersCollectionId, 
                    Id,
                    {Id , Image , Price , Quantity , Tittle , Total , userId , Status , Method , Date}
                                    
                )
         } catch (error) {
             console.log(error);
             
         }
    }

    


    async deleteCart (id) {
        try {
           await this.Database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteOrdersCollectionId,
                id 
            )
            return true
        } catch (error) {
            return false
        }
    }

   

    async getOrders(userId){
        try {
            return await this.Database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOrdersCollectionId,
                [Query.equal('userId', String(userId))]    
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // async updateOrders ({Id , Image , Price , Quantity , Tittle , Total , userId , Status , Method , Date}) {
    //     console.log(Id , Image , Price , Quantity , Tittle , Total , userId , Status , Method , Date);
        
    //     try {
    //         return await this.Database.updateDocument(
    //             conf.appwriteDatabaseId, 
    //             conf.appwriteOrdersCollectionId, 
    //             Id,
    //            {
    //             Id , Image , Price , Quantity , Tittle , Total , userId , Status , Method , Date
    //             }
    //         )
    //  } catch (error) {
    //      return error
    //  }
    // }
}

const OrderServices = new Order()
export default OrderServices