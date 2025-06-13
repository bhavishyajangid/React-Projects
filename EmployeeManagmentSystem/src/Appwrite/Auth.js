import { Client, Account, ID, Databases } from "appwrite";
import conf from "../config/config.js";
import dataBaseServices, { databaseServices } from "./Database.js";
import TaskServices from "./Task.js";
import emailjs from "emailjs-com";
import { showError } from "../utlity/Error&Sucess.js";

export class authService {
  client = new Client();
  account;

  constructor() {
    this.client

      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // .setKey(conf.appwriteAuthKey)
    this.account = new Account(this.client);
  }

  async createAccount(user) {
    let customUserId = ID.unique();
    try {
      let newobj = {
        ...user,
        userId: customUserId,
        newTask: 0,
        completedTask: 0,
        acceptedTask: 0,
        failedTask: 0,
      };

      console.log(newobj, "obj");

      if(newobj.profile){
          
      }

      const setData = await dataBaseServices.setUserProfileData(newobj);

      if (setData) {
        const userAccount = await this.account.create(
          customUserId,
          user.email,
          user.password,
          user.username,
          user.number
        );

        return userAccount ? setData : {};
      } else {
        throw new Error("Failed to save user profile.");
      }
    } catch (error) {
      console.log(error);

      throw error.message || "Something went wrong";
    }
  }

  async login({ email, password }) {
    try {
      const loginUser = await this.account.createEmailPasswordSession(
        email,
        password
      );

      console.log(loginUser, "LOGINUSER");

      if (loginUser) {
        return await this.getUserAllDetails(loginUser.userId);
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      console.log("currnet user");
      const session = await this.account.getSession("current");
      if (session) {
        const isUserLogin = await this.account.get();
        return await this.getUserAllDetails(isUserLogin.$id);
      }

      return null;
    } catch (error) {
      if (error.code === 401) {
        // Don't log anything, just return null silently
        return null;
      }
      console.error("Error in getCurrentUser:", error.message);
      return null;
    }
  }

  async getUserAllDetails(id, queary) {
    try {
      const userDetails = await dataBaseServices.getUser(id, queary);
      return userDetails ? userDetails : [];
    } catch (error) {
      throw new Error("failed to fetch user info", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }

  async getAllUser() {
    try {
      const response = await users.list();
      return response.users || [];
    } catch (error) {
      console.error("Error in getAllUser:", error);
      return [];
    }
  }

  async sendOtp(user) {
    const otpCode = Math.floor(Math.random() * 1000000);

    const templateParams = {
      to_email: user.email, // The recipient's email
      to_name: user.name || "", // The recipient's name
      from_name: "The Manager", // The sender's name
      message: `Your OTP code is: ${otpCode}`, // The message body
    };

    console.log(otpCode, templateParams);

    emailjs.init("V6RgthY8oQceVRjcO");

    try {
      const response = await emailjs.send(
        "service_0y1bee1", // Your service ID
        "template_jxaqwnp", // Your template ID
        templateParams,
        "V6RgthY8oQceVRjcO" // Your user ID
      );

      return response ? otpCode : null;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return null; // Return null if there's an error
    }
  }

  verifyOtp(userOtp, generatedOtp) {
    console.log(userOtp, generatedOtp);

    if (parseInt(userOtp) === parseInt(generatedOtp)) {
      return true;
    } else {
      return false;
    }
  }
}

const authServices = new authService();

export default authServices;
