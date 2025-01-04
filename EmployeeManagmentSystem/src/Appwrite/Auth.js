import { Client, Account, ID } from "appwrite";
import conf from '../config/config.js'
import dataBaseServices from "./Database.js";

export class authService {
    client = new Client();
    account;
    
    constructor() {
        this.client
        
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }
    
    async createAccount({email, password, username , phone}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username , phone);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login({email, password}) {
        try {
            const loginUser = await this.account.createEmailPasswordSession(email, password);

            if(loginUser){
              return await dataBaseServices.getUserDetails(loginUser.userId)
            }
        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
           console.log(error);
            
        }

        return null;
    }

    

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
             return error
        }
    }
   
}

const authServices = new authService();

export default authServices