import conf from '../conf'
import {Client, ID, Databases, Storage, Query} from 'appwrite';

export class StorageService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURl)
        .setProject(conf.appwriteProject_Id);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }
}

const storeservice = new StorageService();

export default storeservice;