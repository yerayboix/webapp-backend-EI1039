import { OpenWeatherAdapter } from "../lib/adapter/OpenWeatherAdapter.js";
import { PlaceAPIServiceResponseConstructor } from "../lib/model/PlaceAPIServiceResponseConstructor.js";
import { PlaceManager } from "../lib/model/PlaceManager.js";

describe('R02-H02-PlaceCoordinatesValidation', () => {
    let pm = new PlaceManager();
    let pasrc = new PlaceAPIServiceResponseConstructor();
    pm.setServiceResponseConstructor(pasrc);
    let place = new Map();
    
    place.set('name', 'Castellon');
    place.set('alias', '');
    place.set('services', [true, false, false]);
    place.set('lat', -0.26);
    place.set('lon', 39.96);


    //En estos test se tiene en cuenta que la informacion de las coordenadas estan validadas previamente
    it('e1_getPlaceInfoFromApi_OneActiveAPI_WeatherAPI_NoDetail_ValidResponse', async () => {
        try {
            let needsDetail = false;
            //Pido los datos de la ubicacion 'place' sin detalles
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que me devuelva un json con la info de las API y miro que la de OpenWeather contiene 3 claves 'weather', 'main' y 'wind'
            expect(Object.keys(result.OpenWeather).length).toBe(3);
        } catch (error) {
            console.log(error);
        }
    });

    it('e2_getPlaceInfoFromApi_OneActiveAPI_WeatherAPI_Detail_ValidResponse', async () => {
        try {
            let needsDetail = true;
            //Pido los datos de la ubicacion 'place' sin detalles
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que me devuelva un json con la info de las API y miro que la de OpenWeather contiene mas de 3 claves correspondientes al resto de info
            expect(Object.keys(result.OpenWeather).length).toBeGreaterThan(3);
        } catch (error) {
            console.log(error);
        }
    });


});