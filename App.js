import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { UserManager } from './lib/model/UserManager.js';
import { GeoapifyAdapter } from './lib/adapter/GeoapifyAdapter.js';
import { PlaceManager } from './lib/model/PlaceManager.js';
import { PlaceAPIServiceResponseConstructor } from './lib/model/PlaceAPIServiceResponseConstructor.js';

const expressApp = express();
const port = 3000;
const userManager = new UserManager();
const ga = new GeoapifyAdapter();
const pm = new PlaceManager();
const srp = new PlaceAPIServiceResponseConstructor();
pm.setGeocodingAdapter(ga);
pm.setServiceResponseConstructor(srp);

expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());
expressApp.use(cors());

expressApp.listen(port, () => {
    console.log(`Example expressApp listening on port ${port}`)
  })

//Registrar usuario
expressApp.post('/user', async (req, res) => {
    let resultjson = {
        mssg: '',
    };

    //Enviamos a frontend el resultado de la peticion
    try {
        let result = await userManager.registerUser(req.body.email, req.body.password);
        console.log(result);
        resultjson.mssg = result;
        res.send(JSON.stringify(resultjson));


    } catch (error) {
        console.log(error);
        resultjson.mssg = error;
        res.send(JSON.stringify(resultjson));
    }
})

//Borrar usuario
expressApp.post('/user/delete', async (req, res) =>{
    let resultjson = {
        mssg: '',
    };

    try{
        let result = await userManager.deleteUser(req.body.userUID);
        resultjson.mssg=result;
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }

})

//Obtener datos de perfil
expressApp.post('/profile', async (req,res)=>{
    let resultjson = {
        mssg: '',
    };

    //Enviamos a frontend el resultado de la peticion
    try {
        let mssg = await userManager.getProfile(req.body.userUID);
        res.send(JSON.stringify(mssg));
    } catch (error) {
        console.log(error);
        resultjson.mssg = error;
        res.send(JSON.stringify(resultjson));
    }
})

//Cambiar contraseña
expressApp.post('/user/password', async (req,res)=>{
    let resultjson = {
        mssg: '',
    };

    //Enviamos a frontend el resultado de la peticion
    try {
        resultjson.mssg = await userManager.changePassword(req.body.userUID, req.body.newpassword);
        res.send(JSON.stringify(resultjson));
    } catch (error) {
        console.log(error);
        resultjson.mssg = error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Busqueda en API por nombre
  expressApp.post('/search/name', async (req,res)=>{
    let resultjson = {
        mssg: '',
        values: [],
    }
    console.log("Respuesta "+req.body.searchTerm+" fin respuesta");
    try{
        resultjson.values = await pm.getPlaceByName(req.body.searchTerm);
        resultjson.mssg='Success';
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Busqueda en API por coordenadas
  expressApp.post('/search/coordinate', async (req,res)=>{
    let resultjson = {
        mssg: '',
        values: [],
    }
    let peticion = req.body.searchTerm.split(",");
    let lat = peticion[1];
    let lon = peticion[0];
    console.log(lat + " y " + lon);
    try{
        if (Number.isNaN(lat) || Number.isNaN(lon)){
            throw "Coordinates must be 2 numbers."
        }
        resultjson.values = await pm.getPlaceByCoordinates(lat, lon);
        resultjson.mssg='Success';
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Devuelve la informacion de la suma de las respuestas de las API activadas
  expressApp.post('/place', async (req,res)=>{
    //Necesita un req con name, services, lat, lon y detail.

    //Devuelve mssg con 'Success' o el mensaje de error y

    //data una array con 3 mapas: OpenWeather, Currents y Ticketmaster
    
    //Para más detalle sobre el contenido de estos puedes poner un
    //console.log en la última prueba de GetPlaceInfoFromApiSpec
    let resultjson = {
        mssg: '',
        data: [],
    }
    let place = new Map();
    place.set('name', req.body.name);
    place.set('alias', '');
    place.set('services', req.body.services);
    place.set('lat', req.body.lat);
    place.set('lon', req.body.lon);
    try{
        resultjson.data = await pm.getPlaceInfoFromAPIServices(place, req.body.detail);
        resultjson.mssg='Success';
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Añadir ubicacion a la lista del usuario
  expressApp.post('/place/add', async (req,res)=>{
    //Pide userUID, coordinates y name.
    //Devuelve Succes o mensaje de error.
    let resultjson = {
        mssg: '',
        apiData: '',
        place: ''
    }
    try{
        resultjson.mssg = await pm.addPlace(req.body.userUID, req.body.coordinates, req.body.name);
        let place = new Map();
        place.set('name', req.body.name)
        place.set('alias', '')
        place.set('services', [true, true, true])
        place.set('visible', true)
        place.set('lat', req.body.coordinates[1])
        place.set('lon', req.body.coordinates[0])
        resultjson.place = {
            'name': req.body.name,
            'alias': '',
            'services': [true, true, true],
            'visible': true,
            'lat': req.body.coordinates[1],
            'lon': req.body.coordinates[0]
        };
        resultjson.apiData = await pm.getPlaceInfoFromAPIServices(place, false);
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })
  //Cambiar alias de una ubicacion
  expressApp.post('/place/alias', async (req,res)=>{
    //Pide userUID, coordinates y alias.
    //Devuelve Succes o mensaje de error.
    let resultjson = {
        mssg: '',
    }
    try{
        resultjson.mssg = await pm.changeAliasToPlace(req.body.userUID, req.body.coordinates, req.body.alias);
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Cambiar visibilidad de una ubicacion
  expressApp.post('/place/visibility', async (req,res)=>{
    //Pide userUID y coordinates.
    //Devuelve Succes o mensaje de error.
    let resultjson = {
        mssg: '',
    }
    try{
        resultjson.mssg = await pm.changeVisibility(req.body.userUID, req.body.coordinates);
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Eliminar una ubicacion de la lista del usuario
  expressApp.post('/place/remove', async (req,res)=>{
    //Pide userUID y coordinates.
    //Devuelve Succes o mensaje de error.
    let resultjson = {
        mssg: '',
    }
    try{
        resultjson.mssg = await pm.removePlace(req.body.userUID, req.body.coordinates);
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

   //Cambiar prioridad de los lugares de la lista del usuario
   expressApp.post('/place/priority', async (req,res)=>{
    //Pide userUID, newPriority y coordinates (del place a cambiar).
    //Devuelve Succes o mensaje de error
    //y los datos de los places reordenados.
    let resultjson = {
        mssg: '',
        data: [],
    }
    try{
        let placeKey = req.body.coordinates[0] + "," + req.body.coordinates[1];
        resultjson.data = await pm.changePlacePriority(placeKey, req.body.newPriority, req.body.userUID);
        resultjson.mssg='Success';
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  //Ordenar las ubicaciones del usuario según proximidad
  expressApp.post('/place/proximity', async (req,res)=>{
    //Pide userUID y coordinates (del usuario).
    //Devuelve mensaje con Success o el mensaje de error
    //y array de las claves primarias de las ubicaciones del usuario, ordenadas.
    let resultjson = {
        mssg: '',
        data: [],
    }
    try{
        resultjson.data = await pm.orderByProximity(req.body.userUID, req.body.coordinates);
        resultjson.mssg = 'Success';
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

  expressApp.post('/places/all', async (req,res)=>{
    //Pide userUID
    //Devuleve Success o mensaje de error.
    let resultjson = {
        mssg: '',
        data: [],
    }
    try{
        let placesUser = await userManager.getProfile(req.body.userUID);
        placesUser = placesUser.places;
        console.log(placesUser)
        let finalData = [];
        for(let place in placesUser){
            console.log(place)
            let map = new Map(Object.entries(placesUser[place]));
            let info = await pm.getPlaceInfoFromAPIServices(map, false);
            finalData.push([placesUser[place], info]);
        } 

        resultjson.data = finalData;
        resultjson.mssg = 'Success';

        res.send(JSON.stringify(resultjson));
    } catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

   //Cambiar los servicios por defecto del usuario
   expressApp.post('/services/default', async (req,res)=>{
    //Recive un userUID y tres servicios: weatherService, newsService y eventsService
    //Estos tres tienen que tener el valor true, false o null (null significa que no cambia)
    //Devuleve Success o mensaje de error.

    let resultjson = {
        mssg: '',
    };

    let services = [req.body.weatherService, req.body.newsService, req.body.eventsService];
    
    try{
        resultjson.mssg = await userManager.changeDefaultAPIServices(req.body.userUID, services);
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }


  })

  //Cambiar los servicios del place del usuario
  expressApp.post('/services/place', async (req,res)=>{
    //Recive un userUID, las lat (latitud), la lon (longitud) 
    //y tres servicios: weatherService, newsService y eventsService
    //Estos tres tienen que tener el valor true, false o null (null significa que no cambia)
    //Devuleve Success o mensaje de error.

    let resultjson = {
        mssg: '',
    };

    let services = [req.body.weatherService, req.body.newsService, req.body.eventsService];
    
    try{
        resultjson.mssg = await pm.changeAPIServices(req.body.userUID, [req.body.lon,req.body.lat], services);
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

export default expressApp;
