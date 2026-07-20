import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import conf from '../config/config.js'


export class Order {
    client = new Client();
    Database;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.Database = new Databases(this.client);
    }

    async placeOrder(orderDetails) {
        // console.log(orderDetails, 'order details');

        try {
            const { $id, ...data } = orderDetails;
            return await this.Database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteOrdersCollectionId,
                $id || ID.unique(),
                data
            )
        } catch (error) {
            console.log(error);

        }
    }




    async cancelOrder(id) {
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



    async getOrders(userId) {
        try {
            return await this.Database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOrdersCollectionId,
                [Query.equal('userId', String(userId))]
            )
        } catch (error) {
            console.log("Appwrite serive :: getOrders :: error", error);
            return false
        }
    }

    async getAllOrders() {
        try {
            return await this.Database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOrdersCollectionId,
                [Query.limit(100), Query.orderDesc('$createdAt')]
            )
        } catch (error) {
            console.log("Appwrite serive :: getAllOrders :: error", error);
            return false;
        }
    }

    async updateOrderStatus(id, status) {
        try {
            return await this.Database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteOrdersCollectionId,
                id,
                { status }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateOrderStatus :: error", error);
            return false;
        }
    }


}

const OrderServices = new Order()
export default OrderServices