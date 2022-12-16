import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";

class UserManager{
    constructor(){
        this.firebaseAuth = auth;
        this.database = db;
    }
      
    registerUser(email, password){
        //Creo usuario de tipo FirebaseUser
            this.firebaseAuth.createUser({
                email: email,
                password: password,
              }).then((userRecord) => {
                console.log('Successfully created new user:', userRecord.uid);
    
                //Lo añado a base de datos
                this.database.collection('users').doc(userRecord.uid).set({
                    UID: userRecord.uid,
                    email: email,
                    servicesByDefault: [true, true, true],
                  });
              }).catch((error) => {
                errorMessage = error.message;
                console.log(errorMessage)
              })
    }

    getUser(){

    }

    deleteUser(){
    }
}
export {UserManager};