import config from "../Config/config.js";
import {Client , Account , ID} from 'appwrite'


export class Authservice{
    client = new Client();
    account;


    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    

     
    async createAccount({email , password , }){
        
    }






}