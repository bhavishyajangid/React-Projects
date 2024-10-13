import config from "../config/config";
import { Client, Account, ID } from "appwrite";// taking from appwrite docs necessary for making account


// making a class of account service so we can easily access the all the method which we have declare or when we use other backend service so we dont need to change all the code change some thing in it so we made class 
 export class AuthService  { 
    Client = new Client();
    account 

    constructor() {
        this.Client
        .setEndpoint(config.appwriteEndPoint)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.Client)  
    }

    async createAccount ({email , password , name }) {
        try {
            // making new account where we receive all the data like name password
             const userAccount =  await this.account.create( ID.unique() , email , password , name)
             if(userAccount){
                return this.Login({email , password})
             }else{
                return userAccount
             }
        } catch (error) {
             throw new error
        }
    }  

    async Login({email , password}) {
        try {
            return  await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
             throw error
        }
    }

    // check the user is login or logout 
    async getCurrentUser () {
        try {
           const CurrentUser = await this.account.get()
           if(CurrentUser){
            return true
           }else{
            return false
           }
        } catch (error) {
            throw error
        }
    }

    async Logout () {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

 const authService = new AuthService();
 export default authService