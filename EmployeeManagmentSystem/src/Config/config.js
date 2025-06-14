const config = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteAuthCollectionId: import.meta.env.VITE_APPWRITE_AUTH_COLLECTION_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    appwriteAllTaskCollectionId : import.meta.env.VITE_APPWRITE_ALLTASK_COLLECTION_ID,
    appwriteMessageCollectionId : import.meta.env.VITE_APPWRITE_MESSAGE_COLLECTION_ID ,
    appwriteAuthKey : import.meta.env.VITE_APPWRITE_API_KEY
};

export default config;
