import conf from '../conf/conf';
import {Client, Account, ID} from 'appwrite';


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProject_id);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password);
            if(userAccount){
                // call Login method
                return this.UserLogin({email, password});
            }else{
                return userAccount;
            }
                            
        } catch (error) {
            throw error;
        }
    }

    async UserLogin({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }

    }

    async getCurrentUser(){
        try {
         return await this.account.get();
            
        } catch (error) {
            console.log('Get UserData Error :' , error)
        }
        return null;
    }

    async UserLogout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;

