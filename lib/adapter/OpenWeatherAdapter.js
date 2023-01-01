class OpenWeatherAdapter{
    API_KEY = '1e79c2ff666df19f443f96610f912d9a';

    //RequestOptions del fetch
    requestOptions = {
        method: ''
    };

    constructor(placeObject, needsDetail){
        this.needsDetail = needsDetail;
        this.placeObject = placeObject;
    }

    async stepsTemplate(){
        this.setParameters();
        try {
            //Envio la request y recibo la respuesta
            let response = await this.sendRequest();
            //Proceso la respuesta teniendo en cuenta si necesita detalle o no
            let processedResponse = this.processData(response);
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
        //Enviamos peticion mediante fetch con APIKEY, medido en Celsius y mediante lat y lon
        return await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+this.placeObject.get('lat')+"&lon="+this.placeObject.get('lon')+"&appid="+this.API_KEY+"&lang=es&units=metric", this.requestOptions)
        .then((response) => response.json())
        .then((result) =>{
            return result;
        })
        .catch((error) => {
          throw error;
        });
    }

    async processData(response){
        //Respuesta con todos los detalles de la API
        if(this.needsDetail){
            return response;
        }
        //Respuesta con detalles minimos
        let noDetailResponse = {
            'weather': [
                {
                    "id": response.weather[0].id,
                    "main": response.weather[0].main,
                    "description": response.weather[0].description,
                    "icon": response.weather[0].icon
                }
            ],
            'main': {
                'temp': response.main.temp,
                'humidity': response.main.humidity,
            },
            'wind': {
                'speed': response.wind.speed 
            }
        }
        return noDetailResponse;
    }
}
export {OpenWeatherAdapter};