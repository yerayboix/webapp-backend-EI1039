import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { UserManager } from './lib/model/UserManager.js';
import { GeoapifyAdapter } from './lib/adapter/GeoapifyAdapter.js';
import { PlaceManager } from './lib/model/PlaceManager.js';

const expressApp = express();
const port = 3000;
const userManager = new UserManager();
const ga = new GeoapifyAdapter();
const pm = new PlaceManager();
pm.setGeocodingAdapter(ga);

expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());
expressApp.use(cors());

expressApp.listen(port, () => {
    console.log(`Example expressApp listening on port ${port}`)
  })


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

  expressApp.post('/search/name', async (req,res)=>{
    let resultjson = {
        mssg: '',
        values: [],
    }
    console.log("Respuesta "+req.body.searchTerm+" fin respuesta");
    try{
        resultjson.values = await pm.getPlaceByName(req.body.searchTerm);
        resultjson.mssg='Success';
        console.log(resultjson)
        res.send(JSON.stringify(resultjson));
    }catch(error){
        console.log(error);
        resultjson.mssg=error;
        res.send(JSON.stringify(resultjson));
    }
  })

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

export default expressApp;
