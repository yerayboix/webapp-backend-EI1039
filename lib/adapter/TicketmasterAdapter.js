import pkg from 'ngeohash';
const { encode } = pkg;

class TicketmasterAdapter{
    API_KEY = '17TI4G3fL8zluMOeYrvGbkIHMxhWZV22';

    //RequestOptions del fetch
    requestOptions = {
        method: ''
    };

    constructor(lat, lon){
        this.lat = lat;
        this.lon = lon;
    }

    async stepsTemplate(){
        this.setParameters();
        try {
            //Envio la request y recibo la respuesta
            let response = await this.sendRequest();
            //Proceso la respuesta con las coordenadas dadas
            let processedResponse = await this.processData(response);
            //Devuelvo la respuesta procesada
            return processedResponse;
        } catch (error) {
            throw error;
        }
    }

    setParameters(){
        this.requestOptions.method = 'GET';
    }

    async sendRequest(){
        //Obtenemos el geoHash de las coordenadas de la ubicacion
        let geoHashCode = encode(this.lat, this.lon);

        //Enviamos peticion mediante fetch con APIKEY de keyword usamos el nombre de la ubicacion y de rango de fecha en los 2 ultimos dias
        return await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey="+this.API_KEY+"&geoPoint="+geoHashCode+"&radius=100&unit=km", this.requestOptions)
        .then((response) => response.json())
        .then((result) =>{
            return result;
        })
        .catch((error) => {
          throw error;
        });
    }

    async processData(response){
        //De la respuesta vamos a coger como maximo 5 eventos
        let events = [];
        let maxEvents = 5;
        let currentEvents = 0;
        if(!response.hasOwnProperty('_embedded')) return events;
        while(currentEvents < maxEvents && currentEvents < response._embedded.events.length){
            events.push(response._embedded.events[currentEvents]);
            currentEvents++;
        }

        return events;
    }
}
export {TicketmasterAdapter};