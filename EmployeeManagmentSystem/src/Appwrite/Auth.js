import { Client, Account, ID } from "appwrite";
import conf from '../config/config.js'
import dataBaseServices from "./Database.js";
import TaskServices from "./Task.js";
import emailjs from "emailjs-com";


export class authService {
    client = new Client();
    account;
    
    constructor() {
        this.client
        
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        // .setKey(conf.appwriteAuthKey)
        this.account = new Account(this.client);
        
    }
    
    async createAccount({email, password, username , number , isEmailVerify}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username , number);

            
            if (userAccount) {

              const setData =  await dataBaseServices.setUserProfileData({username , number, isEmailVerify, email, id : userAccount.targets[0].userId})
              
               
              if(setData){
                return setData
              }
               
            } else {
               return null;
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

    
    async getUserAllDetails(user, id){
          console.log(user , id);
          
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
                    console.log(userTaskData , 'taks');
                    
                       return { ...userDetails, tasks: userTaskData}
                   }else{
                      return {...userDetails , tasks : []}
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

  //   async deleteUser(userId) {
  //     try {
  //         // Call the Appwrite API to delete the user
  //         const response = await users.delete(userId);
  //         console.log('User deleted successfully:', response);
  //     } catch (error) {
  //         console.error('Error deleting user:', error.message);
  //     }
  // }

  //  async getAllUser(){
  //    try {
  //          const response = await users.list()
  //          if(response) return response.users
  //    } catch (error) {
  //      console.log(error);
       
  //    }
  //  }

    async sendOtp(user) {
        const otpCode = Math.floor(Math.random() * 1000000);
      
        const templateParams = {
          to_email: user.email,  // The recipient's email
          to_name: user.name || "", // The recipient's name
          from_name: "The Manager", // The sender's name
          message: `Your OTP code is: ${otpCode}`, // The message body
        };
      
        console.log(otpCode, templateParams);
      
        emailjs.init("V6RgthY8oQceVRjcO");
      
        try {
          const response = await emailjs.send(
            "service_lsyugp9",  // Your service ID
            "template_jxaqwnp",  // Your template ID
            templateParams, 
            "V6RgthY8oQceVRjcO"  // Your user ID
          );
      
          if (response) {
            return otpCode;  // Return the OTP code after sending
          } else {
            return null;  // Return null if sending failed
          }
        } catch (error) {
          console.error("Error sending OTP:", error);
          return null;  // Return null if there's an error
        }
      }
      
      

    verifyOtp(userOtp , generatedOtp){
  console.log(userOtp , generatedOtp);
  
     if (parseInt(userOtp) === parseInt(generatedOtp)) {
         return true
     } else {
       return false
     }
    }
   
}

const authServices = new authService();

export default authServices