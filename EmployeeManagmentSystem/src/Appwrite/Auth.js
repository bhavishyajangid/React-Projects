import { Account, Client, ID } from "appwrite";
import emailjs from "emailjs-com";
import conf from "../config/config.js";
import dataBaseServices from "./Database.js";
import storageServices from "./storage.js";
import { validateAdminPassword } from "../utlity/verifyAdmin.js";

export class authService {
  client = new Client();
  account;

  constructor() {
    // Normal client for frontend actions like login/signup
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount(user) {
    let customUserId = ID.unique();
    let userSavedId = "";
    let userCreated = false;

    let newObj = {
      ...user,
      userId: customUserId,
    };

    try {
      const setData = await dataBaseServices.setUserProfileData(newObj);
      userSavedId = setData.$id;

      let finalUser = await this.account.create(
        customUserId,
        user.email,
        user.password,
        user.userName
      );

      userCreated = true;

      if (finalUser) {
        return finalUser ? setData : [];
      }
    } catch (error) {
      console.log(error);

      if (userSavedId && !userCreated) {
        console.log("delete saved data");

        await dataBaseServices.deleteUserFromDatabase(userSavedId);
      }

      throw new Error(error?.message || "Something went wrong");
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
  async getUserAllDetails(id, queary) {
    try {
      const userDetails = await dataBaseServices.getUser(id, queary);
      return userDetails ? userDetails : [];
    } catch (error) {
      throw new Error(error || "failed to fetch user info");
    }
  }

  async getCurrentUser() {
    try {
      const session = await this.account.getSession("current");

      if (!session) return false;

      try {
        return await this.getUserAllDetails(session.userId);
      } catch (error) {
        await this.logout();
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
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

  async updateUser(data, nameEdit, emailEdit, passwordEdit) {
    try {
      if (nameEdit) {
        this.account.updateName(data.userName);
      }
    } catch (error) {}
  }

  async sendOtp(user) {
    const otpCode = Math.floor(Math.random() * 1000000);
    console.log(user, "in ther otp ");

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
