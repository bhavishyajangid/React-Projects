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
    
    async createAccount({email, password, username , number , isEmailVerify}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username , number);
            console.log(userAccount , 'new user details');
            
            if (userAccount) {

              const setData =  await dataBaseServices.setUserProfileData({username , number, isEmailVerify, email, id : userAccount.targets[0].userId})
              
               
              if(setData){
                return this.login({email, password, userId : setData.$id});
              }
                

                // call another method
               
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
                     const userDetails = await dataBaseServices.getUserDetails(loginUser.userId , "userId")
                     if(userDetails){
                         return userDetails

                     }else{
                        return loginUser
                     }
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
          const userLogout =  await this.account.deleteSessions();
          if(userLogout){
              return true
          }
        } catch (error) {
             return error
        }
    }
   
}

const authServices = new authService();

export default authServices