import { Client , Storage , ID} from "appwrite";
import conf from "../config/config";


export class storageService{
    client = new Client();
    storage 

    constructor(){
        this.client

        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client)
    }

    async createFile(filePath){
        try {
            let result = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                filePath
            )

            if(result){
                let fileUrl = await this.previewFile(result.$id)
                    return {fileId : result.$id , fileUrl : fileUrl}
            }
        } catch (error) {
            console.log(error , 'erorr wile create file');
            throw error.message || "something went wrong"
            
        }
    }

    async previewFile(fileId){
          try {
            let fileUrl = await this.storage.getFilePreview(conf.appwriteBucketId , 
            fileId    
            )

            if(fileUrl){
                return fileUrl
            }
          } catch (error) {
             throw error.message || 'something went wrong'
          }
    }

}

const storageServices = new storageService()
export default storageServices