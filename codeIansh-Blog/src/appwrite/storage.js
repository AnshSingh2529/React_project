import conf from "../conf/conf";
import { Databases, ID, Query, Client, Storage  } from "appwrite";


export class StorageService{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProject_id);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabase_id, conf.appwriteCollection_id, slug, {
                title, content, featuredImage, status, userId
            })
        } catch (error) {
            throw error;
        }
    }  

    async updatePost( slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabase_id, 
                conf.appwriteCollection_id, 
                slug, 
                {
                    title,
                    content, 
                    featuredImage,
                    status
                })
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            const deleted = await this.databases.deleteDocument(
                conf.appwriteDatabase_id, 
                conf.appwriteCollection_id, 
                slug,
                )
                if(!deleted){
                    return false;
                } else{
                    return true;
                }
        } catch (error) {
            throw error;

        }
    }


    async getPost(slug){
        try {
            const Post = await this.databases.getDocument(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                slug 
            )

            if(Post){
                return Post;
            } else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const Posts = await this.databases.listDocuments(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                queries
            )

            if(Posts) {
                return Posts;
            }
            else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    // Files Upload and Delete

    async uploadFile(file){
        try {
            const file = await this.bucket.createFile(
                conf.appwriteBucket_id,
                ID.unique(),
                file,
                )

                if(file){
                    return file;
                }else{
                    return null;
                }
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            const file = await this.bucket.deleteFile(
                conf.appwriteBucket_id,
                fileId
                )
                if(!file){
                    return false;
                } else{
                    return true;
                }
                
        } catch (error) {
            throw error;
        }
    }

    getfilePreview(fileId){
        const getfile = this.bucket.getFilePreview(
            conf.appwriteBucket_id,
            fileId
        )    
        if(getfile){
            return getfile;
        } else{
            return null;
        }
    }
}

const storeService = new StorageService();
export default storeService;