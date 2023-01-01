import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";
import exceptionManager from "./ExceptionManager.js";

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
                return exceptionManager(error.message);
              })

            if(response != 'Success'){
              //Convertimos la exception de firebase a nuestro tipo
              throw response;
            }
            
            return response;
    }

    getUser(){

    }

    async deleteUser(uid) {
        return await this.firebaseAuth.deleteUser(uid)
        .then(async () => {
            await this.database.collection('users').doc(uid).delete();
            return "Success";
        })
        .catch((error) => {
            return exceptionManager(error.message);
        });
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
            throw exceptionManager(error.message);
          });
    }

    
    async getProfile(UID){
      return await this.database.collection("users").doc(UID).get()
      .then((documentSnapshot) => {
          let data = documentSnapshot.data();
          if(data) return data;
          else throw 'There is no user record corresponding to the provided identifier.';
      }).catch((error)=>{
          console.log('Error reading user data:', error);
          throw exceptionManager(error);
      });
    }

}
export {UserManager};
    
