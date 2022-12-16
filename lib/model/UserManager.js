import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";

class UserManager{
    constructor(){
        this.firebaseAuth = auth;
        this.database = db;
    }
      
    async registerUser(email, password){
        //Creo usuario de tipo FirebaseUser
            let response = await this.firebaseAuth.createUser({
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
                  return 'Success';

              }).catch((error) => {
                //console.log(error.message);
                return error.message;
              })

            if(response != 'Success'){
              throw response;
            }
            
            return response;
    }

    getUser(){

    }

    deleteUser(){
    }
}
export {UserManager};