import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { UserManager } from '../model/UserManager';

const expressApp = express()
const port = 3000

expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());
expressApp.use(cors());

expressApp.post('/user/password',(req,res)=>{
    mssg = UserManager.changePassword(req.body.userUID, req.body.newpassword);
    res.send(JSON.stringify(mssg));

   
  })