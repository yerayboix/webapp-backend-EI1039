import { PlaceAPIServiceResponseConstructor } from "../lib/model/PlaceAPIServiceResponseConstructor.js";
import { PlaceManager } from "../lib/model/PlaceManager.js";

describe('R02-H02-PlaceCoordinatesValidation', () => {
    let pm = new PlaceManager();
    let pasrc = new PlaceAPIServiceResponseConstructor();
    pm.setServiceResponseConstructor(pasrc);
    let place = new Map();
    let needsDetail = false;

    place.set('name', 'Castellon');
    place.set('alias', '');
    place.set('services', [true, false, false]);
    place.set('lat', -0.26);
    place.set('lon', 39.96);

    it('e1_getPlaceInfoFromApi_OneActiveAPI_WeatherAPI_ValidCoordinates_NoDetail_ValidResponse', async () => {
        try {
            //Pido los datos de la ubicacion 'place' sin detalles
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que me devuelva un json con 3 claves 'weather', 'main' y 'wind'
            expect(Object.keys(result).length).toBe(3);
        } catch (error) {
            console.log(error);
        }
    });
});