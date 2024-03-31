const conf = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProject_id:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabase_id:String(import.meta.env.VITE_APPWRITE_DATABASE_ID ),
    appwriteCollection_id:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucket_id:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf;