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

expressApp.post('/user', (req, res) => {
    try {
        userManager.registerUser(req.body.email, req.body.password);
        let success = {
            mssg: 'Success',
        };
        //Enviamos a frontend que todo ha salido bien
        res.send(JSON.stringify(success));
    } catch (error) {
        let err = {
            mssg: error.message,
        };
        //Enviamos que algo ha fallado
        res.send(JSON.stringify(err));
    }
})

export default expressApp;