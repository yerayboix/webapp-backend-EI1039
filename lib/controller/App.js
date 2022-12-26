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

expressApp.get('/user',(req,res)=>{
mssg = UserManager.getProfile(req.body.userUID);
console.log('data:', mssg);
res.send(JSON.stringify(mssg));
})

export default expressApp;