// import { Client, Account, ID , Databases , Storage , Query } from "appwrite";
// import conf from '../config/config.js'


// export class service{
//     client = new Client();
//     Database;
    

//     constructor() {
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//         this.Database = new Databases(this.client);
//     }

//     async addToCart (Id , Quantity , userId) {
//         console.log(Id , Quantity , userId);
        
//          try {
//                 return await this.Database.createDocument(
//                     conf.appwriteDatabaseId, 
//                     conf.appwriteCollectionId, 
//                     ID.unique() ,
                    
                        
//                         {
//                             Id,
//                             Quantity, 
//                             userId  
//                          }
                    
                   
//                 )
//          } catch (error) {
//              console.log(error);
             
//          }
//     }

//     async updateCart ({ Quantity } , id) {
//         try {
//             return await this.Database.updateDocument(
//                 conf.appwriteDatabaseId, 
//                 conf.appwriteCollectionId, 
//                 id ,
//               userId =  {
//                    id , 
//                    Quantity, 
//                    userId  
//                 }
//             )
//      } catch (error) {
//          return error
//      }
//     }


//     async deleteCart ({id}) {
//         try {
//             await this.Database.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 id 
//             )
//             return true
//         } catch (error) {
//             return false
//         }
//     }

//     async getProduct ({id}) {
//      try {
//         return await this.Database.getDocument(
//             conf.appwriteDatabaseId, 
//             conf.appwriteCollectionId, 
//             id
//         )
//      } catch (error) {
//           return error
//      }
//     }
// }

// const dataBaseService = new service()
// export default dataBaseService