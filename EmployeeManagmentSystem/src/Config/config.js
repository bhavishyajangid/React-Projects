const config = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteAuthCollectionId: import.meta.env.VITE_APPWRITE_AUTH_COLLECTION_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    appwriteAllTaskCollectionId : import.meta.env.VITE_APPWRITE_ALLTASK_COLLECTION_ID,
    appwriteMessageCollectionId : import.meta.env.VITE_APPWRITE_MESSAGE_COLLECTION_ID ,
    appwriteAuthKey : import.meta.env.VITE_APPWRITE_API_KEY,
    appwriteSalaryCollectionId : import.meta.env.VITE_APPWRITE_SALARY_COLLECTION_ID ,
    appwriteLeaveCollectionId : import.meta.env.VITE_APPWRITE_LEAVE_COLLECTION_ID, 
    appwriteAttendenceCollectionId : import.meta.env.VITE_APPWRITE_ATTENDENCE_COLLECTION_ID,
      OFFICE_LAT :  27.6201472  , 
 OFFICE_LNG :        75.1435776 ,
ALLOWED_RADIUS : 110
};


 

export default config;
