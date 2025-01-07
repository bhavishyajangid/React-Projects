import { Client, Account, ID } from "appwrite";
import conf from '../config/config.js'
import dataBaseServices from "./Database.js";
import TaskServices, { taskService } from "./Task.js";
import { Tasks } from "../export.js";

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
                return  this.getUserAllDetails(loginUser , loginUser.userId)
            }

            return null
   
             
        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            const isUserLogin =  await this.account.get();
              if(isUserLogin){
                return  this.getUserAllDetails(isUserLogin, isUserLogin.$id)
              }
        } catch (error) {
           console.log(error);
            
        }

        return null;
    }

    
    async getUserAllDetails( user, id){
            const userDetails = await dataBaseServices.getUser(id , "userId")
            if(userDetails){
               if(userDetails.admin){
                    const adminTaskData = await TaskServices.getAllTask()
                    if(adminTaskData){
                        return { ...userDetails, tasks: adminTaskData.
                           documents }
                    }
               }else{
                   const userTaskData = await TaskServices.getUserTask(id)
                   if(userTaskData){
                       return { ...userDetails, tasks: userTaskData.
                           documents }
                   }
               }
                
            }else{
                 return user
            }
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