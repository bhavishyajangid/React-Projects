import { Client , Databases, ID } from "appwrite";
import conf from "../config/config";
export class databaseServices{
    client = new Client();
    database;

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client)
    }


     async userProfileData({username ,number , isEmailVerify, email , id}){
        console.log(username ,number , isEmailVerify, email , id);
        
        try {
            const userPersonalData = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAuthCollectionId,
                ID.unique() , 
                {
                    userId : String(id),
                    userName : String(username),
                    email : String(email),
                    number : String(number),
                    isEmailVerify : Boolean(isEmailVerify)
                }  
            )
            return userPersonalData
        } catch (error) {
            console.log(error);
            
        }
     }
}

const dataBaseServices = new databaseServices();

export default dataBaseServices