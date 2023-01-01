class CurrentsAdapter{
    API_KEY = 'mrf7kfPdXfV-1CdQYi7-_SkLoY2nbsJ_Fw0JZqE9xOr6xpAL';

    //RequestOptions del fetch
    requestOptions = {
        method: ''
    };

    constructor(placeName){
        this.placeName = placeName;
    }

    async stepsTemplate(){
        this.setParameters();
        try {
            //Envio la request y recibo la respuesta
            let response = await this.sendRequest();
            //Proceso la respuesta teniendo en cuenta si necesita detalle o no
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
        //Cogemos la fecha de hoy
        let today = new Date();
        //Cogemos la fecha de hace 2 dias
        let twoDaysBefore = new Date();
        twoDaysBefore.setDate(today.getDate() - 2);

        //Las convertimos al formato adecuado que requiere la API
        //Obtenemos el dia de hoy
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let todayString = yyyy+"-"+mm+"-"+dd;

        //Obtenemos la fecha de hace 2 dias
        dd = String(twoDaysBefore.getDate()).padStart(2, '0');
        mm = String(twoDaysBefore.getMonth() + 1).padStart(2, '0');
        yyyy = twoDaysBefore.getFullYear();
        let twoDaysBeforeString = yyyy+"-"+mm+"-"+dd;

        //Enviamos peticion mediante fetch con APIKEY de keyword usamos el nombre de la ubicacion y de rango de fecha en los 2 ultimos dias
        return await fetch("https://api.currentsapi.services/v1/search?language=es&country=ES&keywords="+this.placeName+"&limit=5&start_date="+twoDaysBeforeString+"&end_date="+todayString+"&apiKey="+this.API_KEY, this.requestOptions)
        .then((response) => response.json())
        .then((result) =>{
            return result;
        })
        .catch((error) => {
          throw error;
        });
    }

    async processData(response){
        //De la respuesta vamos a coger como maximo 5 noticias
        let news = [];
        let maxNews = 5;
        let currentNews = 0;
        while(currentNews < maxNews && currentNews < response.news.length){
            news.push(response.news[currentNews]);
            currentNews++;
        }

        return news;
    }
}
export {CurrentsAdapter};