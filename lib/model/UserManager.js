import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";
import userException from "./ExceptionManager.js";

class UserManager{
  
    constructor(){
        this.firebaseAuth = auth;
        this.database = db;
    }


    registerUser(email, password){

    }

    getUser(){

    }

    deleteUser(){
    }

    async getProfile(UID){
        return await this.database.collection("users").doc(UID).get()
        .then((documentSnapshot) => {
            let data = documentSnapshot.data();
            if(data) return data;
            else throw 'There is no user record corresponding to the provided identifier.';
        }).catch((error)=>{
            console.log('Error reading user data:', error);
            throw userException(error);
        });
    }

}

export {UserManager};