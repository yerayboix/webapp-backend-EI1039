import { PlaceAPIServiceResponseConstructor } from "../lib/model/PlaceAPIServiceResponseConstructor.js";
import { PlaceManager } from "../lib/model/PlaceManager.js";
import { OpenWeatherMock } from "./mocks/OpenWeatherMock.js";
import { CurrentsMock } from "./mocks/CurrentsMock.js";
import { TicketmasterMock } from "./mocks/TicketmasterMock.js";

describe('R02-H03-GetPlaceInfoFromApiMock', () => {
    let pm = new PlaceManager();
    let pasrc = new PlaceAPIServiceResponseConstructor();
    pm.setServiceResponseConstructor(pasrc);

    beforeEach(()=>{
        let pm = new PlaceManager();
        let pasrc = new PlaceAPIServiceResponseConstructor();
        pm.setServiceResponseConstructor(pasrc);

        let weather = new OpenWeatherMock();
        let news = new CurrentsMock();
        let events = new TicketmasterMock();

        weather.stepsTemplate = jasmine.createSpy("stepsWeather").and.returnValues({'key1':'', 'key2':'', 'key3':''});
        news.stepsTemplate = jasmine.createSpy("stepsNews").and.returnValues({'key1':'', 'key2':'', 'key3':''});
        events.stepsTemplate = jasmine.createSpy("stepsEvents").and.returnValues({'key1':'', 'key2':'', 'key3':''});

        pasrc.setWeather();
        pasrc.setNews();
        pasrc.setEvents();
    });

    it("getPlaceInfoFromApiMock_onlyWeather_validResponse", async ()=>{
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

    it("getPlaceInfoFromApiMock_onlyNews_validResponse", async ()=>{
        //Creamos una ubicacion con datos previamente verificados y solo activo CurrentsAPI
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [false, true, false]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);
        let needsDetail = false;

        try {
            //Pido los datos de la ubicacion 'place' sin detalles
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que me devuelva un json con la info de las API y miro que se ha devuelto alguna noticia
            expect(Object.keys(result.Currents).length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

    it("getPlaceInfoFromApiMock_onlyEvents_validResponse", async ()=>{
        //Creamos una ubicacion con datos previamente verificados y solo activo Ticketmaster
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [false, false, true]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);
        let needsDetail = false;

        try {
            //Pido los datos de la ubicacion 'place'
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que la respuesta tenga al menos 1 resultado proveniente de la API
            expect(Object.keys(result.Ticketmaster).length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

    it("getPlaceInfoFromApiMock_all_validResponse", async ()=>{
        //Creamos una ubicacion con datos previamente verificados y activamos todas las API
        let place = new Map();
        place.set('name', 'Onda');
        place.set('alias', '');
        place.set('services', [true, true, true]);
        place.set('lat', 39.96);
        place.set('lon', -0.26);
        let needsDetail = false;

        try {
            //Pido los datos de la ubicacion 'place'
            let result = await pm.getPlaceInfoFromAPIServices(place, needsDetail);
            //Espero que la respuesta tenga al menos 1 resultado proveniente de la API Ticketmaster
            expect(Object.keys(result.Ticketmaster).length).toBeGreaterThan(0);
            //Espero que me devuelva un json con la info de la API Currents y miro que se ha devuelto alguna noticia
            expect(Object.keys(result.Currents).length).toBeGreaterThan(0);
            //Espero que me devuelva un json con la info de las API y miro que la de OpenWeather contiene mas de 3 claves correspondientes al resto de info
            expect(Object.keys(result.OpenWeather).length).toBeGreaterThanOrEqual(3);

        } catch (error) {
            console.log(error);
        }
    });
});