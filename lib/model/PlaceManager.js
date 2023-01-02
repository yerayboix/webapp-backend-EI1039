import { db } from "../../config/firebase.js";
import exceptionManager from "./ExceptionManager.js";

class PlaceManager{
    geocodingAdapter;
    serviceResponseConstructor;

    constructor(){
        this.database=db;
    };

    setServiceResponseConstructor(serviceResponseConstructor){
        this.serviceResponseConstructor = serviceResponseConstructor;
    };

    setGeocodingAdapter(geocodingAdapter){
        this.geocodingAdapter = geocodingAdapter;
    };

    async getPlaceByName(placeName){
        return this.geocodingAdapter.validatePlaceByName(placeName);
    };

    async getPlaceByCoordinates(lat, lon){
        return this.geocodingAdapter.validatePlaceByCoordinates(lat, lon);
    };

    async getPlaceInfoFromAPIServices(placeObject, needsDetail){
        return await this.serviceResponseConstructor.obtainAllActiveServicesFromPlace(placeObject, needsDetail);
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
            'visible': true,
            'lat': coordinates[1],
            'lon': coordinates[0]
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

    async changeAliasToPlace(uid, coordinates, alias){
      return await this.database.collection("users").doc(uid).get()
      .then( async (documentSnapshot)=>{
        let data = documentSnapshot.data();
        if(data) {
          let key = coordinates[0]+","+coordinates[1];
          if(!data.places.hasOwnProperty(key)) throw 'This user does not have this place in their list.';
          data.places[key].alias=alias;
          let result = await this.database.collection("users").doc(uid).set(data);
          return 'Success';
        }
        else throw 'There is no user record corresponding to the provided identifier.';
      }).catch(error=>{
        console.log('Error adding a place for this user:', error);
        throw exceptionManager(error);
      });
    }

    async changeVisibility(uid, coordinates){
      return await this.database.collection("users").doc(uid).get()
      .then( async (documentSnapshot)=>{
        let data = documentSnapshot.data();
        if(data) {
          let key = coordinates[0]+","+coordinates[1];
          if(!data.places.hasOwnProperty(key)) throw 'This user does not have this place in their list.';
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
      
    async removePlace(uid, coordinates){
      return await this.database.collection("users").doc(uid).get()
      .then( async (documentSnapshot)=>{
        let data = documentSnapshot.data();
        if(data) {
          let key = coordinates[0]+","+coordinates[1];
          if(!data.places.hasOwnProperty(key)) throw 'This user does not have this place in their list.';
          delete data.places[key];
          let result = await this.database.collection("users").doc(uid).set(data);
          return 'Success';
        }
        else throw 'There is no user record corresponding to the provided identifier.';
      }).catch(error=>{
        console.log('Error adding a place for this user:', error);
        throw exceptionManager(error);
      });
    }

    async changePlacePriority(placeKey, newPriority, uid){
      return await this.database.collection('users').doc(uid).get()
      .then(async (documentSnapshot) => {
        let data = documentSnapshot.data();
        if(data) {
          let key = placeKey;
          if(!data.places.hasOwnProperty(key)) throw 'This user does not have this place in their list.';
          let oldPriority = data.places[placeKey].priority;
          if(newPriority < oldPriority){
            for(let property in data.places){
              if(data.places[property].priority >= newPriority && data.places[property].priority < oldPriority){
                //console.log("ANTES   " +data.places[property].name+ data.places[property].priority)
                data.places[property].priority = data.places[property].priority + 1;
                //console.log("DESPUES   " +data.places[property].name+  data.places[property].priority)
              }
            }
          }
          else{
            for(let property in data.places){
              if(data.places[property].priority <= newPriority && data.places[property].priority > oldPriority){
                //console.log("ANTES   " +data.places[property].name+  data.places[property].priority)
                data.places[property].priority = data.places[property].priority - 1;
                //console.log("DESPUES   " +data.places[property].name+  data.places[property].priority)
              }
            }
          }
          data.places[placeKey].priority = newPriority;
          let result = await this.database.collection('users').doc(uid).set(data);
          //console.log("FINAL   " + data.places)
          return data;
        }
        else throw 'There is no user record corresponding to the provided identifier.';
      }).catch(error => {
        console.log('Error adding a place for this user:', error);
        throw exceptionManager(error);
      })
    }
    
}
export {PlaceManager};

