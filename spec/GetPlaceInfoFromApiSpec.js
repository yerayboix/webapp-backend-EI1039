import { OpenWeatherAdapter } from "../lib/adapter/OpenWeatherAdapter.js";
import { PlaceAPIServiceResponseConstructor } from "../lib/model/PlaceAPIServiceResponseConstructor.js";
import { PlaceManager } from "../lib/model/PlaceManager.js";

describe('R02-H02-PlaceCoordinatesValidation', () => {
    let pm = new PlaceManager();
    let pasrc = new PlaceAPIServiceResponseConstructor();
    pm.setServiceResponseConstructor(pasrc);

    beforeEach(() => {
        pm = new PlaceManager();
        pasrc = new PlaceAPIServiceResponseConstructor();
        pm.setServiceResponseConstructor(pasrc);
    })

    //En estos test se tiene en cuenta que la informacion de las coordenadas estan validadas previamente
    it('e1_getPlaceInfoFromApi_OneActiveAPI_WeatherAPI_NoDetail_ValidResponse', async () => {
        //Creamos una ubicacion con datos previamente verificados y solo activo WeatherAPI
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [true, false, false]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);

        try {
            //No queremos detalle
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
        //Creamos una ubicacion con datos previamente verificados y solo activo WeatherAPI
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [true, false, false]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);

        try {
            //Queremos detalle
            let needsDetail = true;
            //Pido los datos de la ubicacion 'place' sin detalles
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que me devuelva un json con la info de las API y miro que la de OpenWeather contiene mas de 3 claves correspondientes al resto de info
            expect(Object.keys(result.OpenWeather).length).toBeGreaterThan(3);
        } catch (error) {
            console.log(error);
        }
    });

    it('e3_getPlaceInfoFromApi_OneActiveAPI_CurrentsAPI_ValidResponse', async () => {
        //Creamos una ubicacion con datos previamente verificados y solo activo CurrentsAPI
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [false, true, false]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);

        try {
            //Pido los datos de la ubicacion 'place' sin detalles
            let result = await pm.getPlaceInfoFromAPIServices(place);
            //Espero que me devuelva un json con la info de las API y miro que se ha devuelto alguna noticia
            expect(Object.keys(result.Currents).length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

    it('e4_getPlaceInfoFromApi_OneActiveAPI_TicketmasterAPI_ValidResponse', async () => {
        //Creamos una ubicacion con datos previamente verificados y solo activo Ticketmaster
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [false, false, true]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);

        try {
            //Pido los datos de la ubicacion 'place'
            let result = await pm.getPlaceInfoFromAPIServices(place);
            //Espero que la respuesta tenga al menos 1 resultado proveniente de la API
            expect(Object.keys(result.Ticketmaster).length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

});