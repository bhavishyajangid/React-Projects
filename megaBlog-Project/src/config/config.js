const config = {
    appwriteEndPoint : String(import.meta.env.VITE_APPWRITE_END_POINT) , 
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteDataBaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config