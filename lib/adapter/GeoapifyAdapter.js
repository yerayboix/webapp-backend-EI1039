import { coordinatesException } from "../model/ExceptionManager.js";

class GeoapifyAdapter {
    API_KEY = "00c9b33ffa30420db05ac14b7c120c9f";
  
    async validatePlaceByCoordinates(lat, lon) {
      let requestOptions = {
        method: "GET",
      };
  
      return await fetch("https://api.geoapify.com/v1/geocode/reverse?lat="+lat+"&lon="+lon+"&type=city&format=json&apiKey="+this.API_KEY, requestOptions)
          .then((response) => response.json())
          .then((result) =>{
              if(result.hasOwnProperty('statusCode')){
                throw coordinatesException(result.message);
              }
              else if(result.results.length > 0) {
                return result.results;
            }
              else throw 'PlaceCoordinatesNotFound';
          })
          .catch((error) => {
            throw error;
          });
      };
  }
  export {GeoapifyAdapter};
  
  