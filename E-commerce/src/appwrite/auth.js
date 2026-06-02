import { Client, Account, ID } from "appwrite";
import conf from '../config/config.js'
import emailjs from "@emailjs/browser";
import dataBaseServices from "./Database.js";

export class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client
        
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }
    
    async createAccount({email, password, userName}) {
        try {
          console.log("Creating account with:", { email, password, userName });
            const userAccount = await this.account.create(ID.unique(), email, password, userName);
            console.log(userAccount , "userAccount");
            if (userAccount) {
                // call another method
                const savedDataInDb = await dataBaseServices.saveUserToDb  ({
                    userId : userAccount.$id,
                    $id: ID.unique(),
                    userName,
                    email,
                    password,
                    isAdmin : false,
                    $createdAt : new Date().toISOString(),
                    $updatedAt : new Date().toISOString()
                })

                console.log(savedDataInDb , "savedDataInDb");
                if(savedDataInDb){
                  return this.login({email, password});
                }

                throw new Error("Failed to save user data in database");
            } 

            throw new Error("Failed to create account");
        } catch (error) {
            throw error;
        }
    }


   async login({ email, password }) {
  try {
      await this.account.createEmailPasswordSession(
      email,
      password
    );
    const user = await this.account.get();
    if(user){
      const userData = await dataBaseServices.getUser(user.$id);
      if(userData) {
        return userData;
      }

    }
    console.log(user , "user from login function");
    
     await this.account.deleteSession("current");
     throw new Error("User data not found in database");
    
  } catch (error) {
    throw error;
  }
}


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async signupWithGoogle(){
        try{
          await this.account.createOAuth2Session(
  "google",
  "http://localhost:5173/",
  "http://localhost:5173/login"
)
        }catch(error){
            throw new Error(error.message || "Failed to sign up with Google");
        }
    }

    async sendOtp({email , name }) {
    const otpCode = Math.floor(Math.random() * 1000000);

    const templateParams = {
      to_email: email, // The recipient's email
      to_name: name || "", // The recipient's name
      from_name: "The Manager", // The sender's name
      message: `Your OTP code is: ${otpCode}`, // The message body
    };

    console.log(otpCode, templateParams);

    emailjs.init("V6RgthY8oQceVRjcO");

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      return response ? otpCode : null;
    } catch (error) {
      console.log("Error sending OTP:", error);
      throw new Error("Failed to send OTP" , error);
    }
  }

  async verifyOtp(generatedOtp, userOtp) {
    console.log("Verifying OTP:", { generatedOtp, userOtp });
    return parseInt(generatedOtp) === parseInt(userOtp);
  }
 

}

const authService = new AuthService();

export default authService