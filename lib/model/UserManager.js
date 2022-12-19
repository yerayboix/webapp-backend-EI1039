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

    async changePassword(UID, newPassword){
        return await auth.updateUser(UID, {
          password: newPassword
        })
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully changing password');
            return 'Success'; 
          })
          .catch((error) => {
            console.log('Error changing password:', error.message);
            throw userException(error.message);
          });
    }

}

export {UserManager};