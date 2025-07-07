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

  async createAccount(user, currentUser) {
    let customUserId = ID.unique();
    let imageId = "";
    let userSavedId = "";
    let userCreated = false;
    let sessionDeleted = false;

    try {
      if (currentUser?.admin) {
        let isValid = await validateAdminPassword(
          currentUser.email,
          user.adminPassword
        );
        if (!isValid) throw new Error("admin password is invalid");
      }

      console.log("password is valid");

      // console.log(setData, "setDATA is saved");

      if (user.profileUrl) {
        let result = await storageServices.createFile(user.profileUrl[0]);
        user.profileUrl = result.fileUrl;
        imageId = result.fileId;
      }
      console.log(user, "image saved");

      let newobj = {
        ...user,
        userId: customUserId,
        newTask: 0,
        completedTask: 0,
        acceptedTask: 0,
        failedTask: 0,
      };
      delete newobj.password;
      delete newobj.adminPassword;

      const setData = await dataBaseServices.setUserProfileData(newobj);
      userSavedId = setData.$id;
      console.log("data saved");

      if (currentUser?.admin && setData) {
        await this.account.deleteSession("current");
        sessionDeleted = true;
      }

      console.log("delete session");

      let finalUser = await this.account.create(
        customUserId,
        user.email,
        user.password,
        user.userName
      );

      userCreated = true;

      console.log(finalUser, "account create");

      if (finalUser) {
        if (currentUser?.admin) {
          return await this.login({
            email: currentUser.email,
            password: user.adminPassword,
          });
        } else {
          return finalUser ? setData : [];
        }
      }
    } catch (error) {
      console.log(error);

      if (imageId && !userCreated) {
        console.log("delete image");

        try {
          await storageServices.deleteFile(imageId);
        } catch (err) {
          console.warn("Failed to delete uploaded image:", err.message);
        }
      }

      if (userSavedId && !userCreated) {
        console.log("delete saved data");

        await dataBaseServices.deleteUserFromDatabase(userSavedId);
      }

      if (sessionDeleted && currentUser?.admin) {
        console.log("login user again");

        await this.login({
          email: currentUser.email,
          password: user.adminPassword,
        });
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

  async updateUser(data, nameEdit, emailEdit, passwordEdit) {
    try {
      if (nameEdit) {
        this.account.updateName(data.userName);
      }
    } catch (error) {}
  }
}

const authServices = new authService();

export default authServices;
