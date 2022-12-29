import { OpenWeatherAdapter } from "../adapter/OpenWeatherAdapter.js";
import { CurrentsAdapter } from "../adapter/CurrentsAdapter.js";

class PlaceAPIServiceResponseConstructor{

    async obtainAllActiveServicesFromPlace(placeObject, needsDetail){
        //Formato de la respuesta que queremos
        let response = {
            OpenWeather: {

            },
            Currents: {

            }
        }
        //Bucle para recorrer los servicios que tiene activos el usuario
        for (let i = 0; i < placeObject.get('services').length; i++) {
            //Comprobamos que el servicio quiera informacion
            if(placeObject.get('services')[i]){
                //WeatherAPI
                if(i == 0){
                    let op = new OpenWeatherAdapter(placeObject, needsDetail);
                    try {
                        response.OpenWeather = await op.stepsTemplate();
                    } catch (error) {
                        throw error;
                    }
                    
                }
                //CurrentsAPI
                if(i == 1){
                    let cu = new CurrentsAdapter(placeObject.get('name'));
                    try {
                        response.Currents = await cu.stepsTemplate();
                    } catch (error) {
                        throw error;
                    }
                }
            }
        }
        return response;
    }
};
export{PlaceAPIServiceResponseConstructor};