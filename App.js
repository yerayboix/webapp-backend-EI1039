import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { UserManager } from './lib/model/UserManager.js';

const expressApp = express();
const port = 3000;
const userManager = new UserManager();

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
    let mssg = await userManager.getProfile(req.body.userUID);
    res.send(JSON.stringify(mssg));
})

export default expressApp;
