const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID),
    appwriteAuthdbCollectionId: String(import.meta.env.VITE_APPWRITE_AUTHDB_COLLECTION_ID),
    appwriteProductCollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID),
    appwriteOrdersCollectionId: String(import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf