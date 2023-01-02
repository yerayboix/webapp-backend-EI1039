import { PlaceManager } from "../lib/model/PlaceManager.js";
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe('R02-H05-ChangeAliasToPlace', function(){
    let email; 
    let uid;
    let user;
    let pm = new PlaceManager();

    beforeAll(async function(){
        await auth.createUser({
            email: 'test@uji.es',
            password: '123456'
        }).then(async (userRecord) => {
            email = userRecord.email;
            uid = userRecord.uid;
            await db.collection('users').doc(uid).set({
                UID: uid,
                email: email,
                servicesByDefault: [true, true, true],
                places : {
                    "-0.26,39.96":{
                        alias:"",
                        name:"Onda",
                        services:[true, true, true],
                        visible:true,
                        lat: "39.96",
                        lon: "-0.26",
                        priority: 0
                    },
                    "-0.04,39.99":{
                        alias:"",
                        name:"Castelló de la Plana",
                        services:[true, true, true],
                        visible:true,
                        lat: "39.99",
                        lon: "-0.04",
                        priority: 1
                    },
                }
            })
        }).catch((error => {
            console.log(error.message);
        }))
    })

    afterAll(async function(){
        //userManager.deleteUser(email);
        await auth.getUserByEmail('test@uji.es')
        .then(async (userRecord) => {
            auth.deleteUser(userRecord.uid);
            await db.collection('users').doc(userRecord.uid).delete();
        }).catch((error) => {
            //console.log(error);
        })
    });

    it("orderByProximity_orderedCorrectly", async function(){
        let origin = {
            lat: "39.86",
            lon: "-0.17"
        }
        let response = await pm.orderByProximity(uid, origin);
        expect(response).toEqual(["-0.26,39.96","-0.04,39.99"]);
    })
 })