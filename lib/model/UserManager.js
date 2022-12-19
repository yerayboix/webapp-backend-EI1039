import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";
import userException from "./ExceptionManager.js";

class UserManager{
  
    constructor(){
        this.firebaseAuth = auth;
        this.database = db;
    }

  async registerUser(email, password){
    //Creo usuario de tipo FirebaseUser que devolvera si ha funcionado o no en la variable response
        let response = await this.firebaseAuth.createUser({
            email: email,
            password: password,
          }).then(async (userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);

            //Lo añado a base de datos
            await this.database.collection('users').doc(userRecord.uid).set({
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
          //Convertimos la exception de firebase a nuestro tipo
          console.log(response);
          throw userException(response);
        }
        
        return response;
}

    deleteUser(){
    
    }
}
export{UserManager};