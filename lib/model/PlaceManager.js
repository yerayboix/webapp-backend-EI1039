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

    async orderByProximity(uid, origin){
      let ordered = await this.database.collection("users").doc(uid).get()
      .then((documentSnapshot)=>{
        let data = documentSnapshot.data();
        if(data){
          let locations = Object.values(data.places);
          return this.#orderByProximity(locations, origin);
        }
      }).catch(error=>{
        console.log('Error ordering by proximity:', error);
        throw exceptionManager(error);
      });
      
      for ( let i = 0; i<ordered.length; i++){
        ordered[i] = ordered[i].lon + "," + ordered[i].lat;
      }
      return ordered;
    }
    
    #orderByProximity(locations, origin){
      const EARTH_RADIUS = 6371; // Radio de la Tierra en kilómetros
      const originLat = this.#toRadians(origin.lat);
      const originLon = this.#toRadians(origin.lon);
    
      return locations.sort((a, b) => {
        const aLat = this.#toRadians(a.lat);
        const aLon = this.#toRadians(a.lon);
        const bLat = this.#toRadians(b.lat);
        const bLon = this.#toRadians(b.lon);
    
        const aDistance = this.#haversineDistance(originLat, originLon, aLat, aLon, EARTH_RADIUS);
        const bDistance = this.#haversineDistance(originLat, originLon, bLat, bLon, EARTH_RADIUS);
    
        return aDistance - bDistance;
      });
    }
    
    #toRadians(degrees) {
      return degrees * (Math.PI / 180);
    }
    
    #haversineDistance(lat1, lon1, lat2, lon2, radius) {
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return radius * c;
    }
}
export {PlaceManager};

