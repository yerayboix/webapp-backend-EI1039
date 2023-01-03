import { PlaceManager } from "../lib/model/PlaceManager.js";
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe('R04-H01-ChangeAPIServicesFromAllPlaces', function(){
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
                places: {
                    "-0.26,39.96":{
                        alias:"",
                        name:"Onda",
                        services:[true, true, true],
                        visible:true,
                        lat: "39.96",
                        lon: "-0.26"
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
                    "-1.11,40.34": {
                        alias:"",
                        name:"Teruel",
                        services:[true, true, true],
                        visible:true,
                        lat: "40.34",
                        lon: "-1.11",
                        priority: 2
                    },
                    "-35.93,-5.95": {
                        alias:"",
                        name:"Barcelona",
                        services:[true, true, true],
                        visible:true,
                        lat: "-5.95",
                        lon: "-35.93",
                        priority: 3
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

    it("changeAPIServicesFromAllPlaces_placesInList_servicesChanged", async function(){
        let response = await pm.changeAllAPIServices(uid, [false, null, true]);
        expect(response).toEqual('Success');
    })

    it("changeAPIServicesFromAllPlaces_noPlacesInList_noPlacesInListException", async function(){
        await db.collection('users').doc(uid).set({
            UID: uid,
            email: email,
            servicesByDefault: [true, true, true],
            places: {}
        })
        
        try{
            let response = await pm.changeAllAPIServices(uid, [false, null, true]);
            fail("Didn't throw exception");
        }catch(error){
            expect(error).toBe('NoPlacesInList');
        }
        
    })

 })