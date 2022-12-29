import { db } from "../../config/firebase.js";
import exceptionManager from "./ExceptionManager.js";


class PlaceManager{

    constructor(){
        this.database=db;
    }

    async changeVisibility(uid, coordinates){
      return await this.database.collection("users").doc(uid).get()
      .then( async (documentSnapshot)=>{
        let data = documentSnapshot.data();
        if(data) {
          let key = coordinates[0]+","+coordinates[1];
          if(!data.places.hasOwnProperty(key)) throw 'This user does not have has this place in their list.';
          let current = data.places[key].visible;
          data.places[key].visible = !current;
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