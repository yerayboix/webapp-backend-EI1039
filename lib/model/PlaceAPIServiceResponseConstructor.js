import { OpenWeatherAdapter } from "../adapter/OpenWeatherAdapter.js";
import { CurrentsAdapter } from "../adapter/CurrentsAdapter.js";
import { TicketmasterAdapter } from "../adapter/TicketmasterAdapter.js";

class PlaceAPIServiceResponseConstructor{

    constructor(){
        this.wa = null;
        this.na = null;
        this.ea = null;
    }

    setEvents(eventsAdapter){
        this.ea = eventsAdapter;
    }
    
    setNews(newsAdapter){
        this.na = newsAdapter;
    }
    
    setWeather(weatherAdapter){
        this.wa = weatherAdapter;
    }

    getWeather(weatherAdapter){
        if(this.wa == null && weatherAdapter != undefined){
            this.setWeather(weatherAdapter);
        }
        return this.wa;
    }

    getNews(newsAdapter){
        if(this.na == null && newsAdapter != undefined){
            this.setNews(newsAdapter);
        }
        return this.na;
    }

    getEvents(eventsAdapter){
        if(this.ea == null && eventsAdapter != undefined){
            this.setEvents(eventsAdapter);
        }
        return this.ea;
    }

    async obtainAllActiveServicesFromPlace(placeObject, needsDetail){
        //Formato de la respuesta que queremos
        let response = {
            OpenWeather: {

            },
            Currents: {

            },
            Ticketmaster: {

            }
        }
        //Bucle para recorrer los servicios que tiene activos el usuario
        for (let i = 0; i < placeObject.get('services').length; i++) {
            //Comprobamos que el servicio quiera informacion
            if(placeObject.get('services')[i]){
                //WeatherAPI
                if(i == 0){
                    let op = this.getWeather(new OpenWeatherAdapter(placeObject, needsDetail));
                    try {
                        response.OpenWeather = await op.stepsTemplate();
                    } catch (error) {
                        throw error;
                    }
                    
                }
                //CurrentsAPI
                if(i == 1){
                    let cu = this.getNews(new CurrentsAdapter(placeObject.get('name')));
                    try {
                        response.Currents = await cu.stepsTemplate();
                    } catch (error) {
                        throw error;
                    }
                }
                //Ticketmaster
                if(i == 2){
                    let tm = this.getEvents(new TicketmasterAdapter(placeObject.get('lat'), placeObject.get('lon')));
                    try {
                        response.Ticketmaster = await tm.stepsTemplate();
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