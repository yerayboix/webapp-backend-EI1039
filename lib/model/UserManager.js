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
        return await db.collection("users").doc(UID).get().then(documentSnapshot => {
            let data = documentSnapshot.get('servicesByDefault');
            return {...data};
        }).catch((error)=>{
            console.log('Error reading user data:', error.message);
            throw userException(error.message);
        });
    }

}

export {UserManager};