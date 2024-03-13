import conf from '../conf.js';

import {Client, Account, ID} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProject_Id);

        this.account = new Account(this.client);

    }
      
    // For creating an New Account. 
    async createAccount({email, password, name }){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call another method;
                return this.login(email, password);
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw error;

        }
    }

    // For Login your Existing Account.
    async login({email, password}){
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // For get the Current User
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
        }
        return null;
    }

    // For Logout the User
    async Logout(){
        try{
            return await this.account.deleteSession();
        }catch(error){
            throw error;
        }
        
    }



}

