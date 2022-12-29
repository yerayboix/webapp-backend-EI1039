import { db } from "../../config/firebase.js";
import exceptionManager from "./ExceptionManager.js";

class PlaceManager{

    constructor(){
        this.database=db;
    }

    async addPlace(uid, coordinates, name){
      return await this.database.collection("users").doc(uid).get()
      .then( async (documentSnapshot)=>{
        let data = documentSnapshot.data();
        if(data) {
          let key = coordinates[0]+","+coordinates[1];
          if(data.places.hasOwnProperty(key)) throw 'This user already has this place in their list.';
          data.places[key] = {
            'name':name,
            'alias':'',
            'services':data.servicesByDefault,
            'visible': true
          }
          let result = await this.database.collection("users").doc(uid).set(data);
          return 'Success';
        }
        else throw 'There is no user record corresponding to the provided identifier.';
      }).catch(error=>{
        console.log('Error adding a place for this user:', error);
        throw exceptionManager(error);
      });
    }
      
}
export {PlaceManager};