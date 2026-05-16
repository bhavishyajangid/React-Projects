import { Client, Account, ID } from "appwrite";
import conf from '../config/config.js'
import emailjs from "@emailjs/browser";

export class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client
        
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }
    
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
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
            return await this.account.createEmailPasswordSession(email, password);
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
 

}

const authService = new AuthService();

export default authService