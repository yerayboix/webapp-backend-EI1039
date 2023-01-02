import {PlaceManager} from '../lib/model/PlaceManager.js';
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe("R03-H04-ChangePlacePrioritySpec", function(){
    let email; 
    let uid;
    let user;
    let pm = new PlaceManager();

    beforeEach(async function(){
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
                    }
                }
            })
        }).catch((error => {
            console.log(error.message);
        }))
    });

    afterEach(async function(){
       await auth.getUserByEmail('test@uji.es')
       .then(async (userRecord) => {
           auth.deleteUser(userRecord.uid);
           await db.collection('users').doc(userRecord.uid).delete();
       }).catch((error) => {
           //console.log(error);
       })
    });

    it("e1_changePlacePriority_oldPriority>newPriority&newPriority=firstOne_change", async function(){
        let placeKey = "-35.93,-5.95";
        let newPriority = 0;
        await pm.changePlacePriority(placeKey, newPriority, uid);
        let userPlaces = await (await db.collection('users').doc(uid).get()).get('places');
        expect(userPlaces["-35.93,-5.95"].priority).toBe(newPriority);
        expect(userPlaces["-0.26,39.96"].priority).toBe(1);
        expect(userPlaces["-0.04,39.99"].priority).toBe(2);
        expect(userPlaces["-1.11,40.34"].priority).toBe(3);
    });

    it("e2_changePlacePriority_oldPriority<newPriority&newPriority=lastOne_change", async function(){
        let placeKey = "-0.26,39.96";
        let newPriority = 3;
        await pm.changePlacePriority(placeKey, newPriority, uid);
        let userPlaces = await (await db.collection('users').doc(uid).get()).get('places');
        expect(userPlaces["-35.93,-5.95"].priority).toBe(2);
        expect(userPlaces["-0.26,39.96"].priority).toBe(newPriority);
        expect(userPlaces["-0.04,39.99"].priority).toBe(0);
        expect(userPlaces["-1.11,40.34"].priority).toBe(1);
    });

    it("e3_changePlacePriority_oldPriority=newPriority_noChange", async function(){
        let placeKey = "-0.26,39.96";
        let newPriority = 0;
        await pm.changePlacePriority(placeKey, newPriority, uid);
        let userPlaces = await (await db.collection('users').doc(uid).get()).get('places');
        expect(userPlaces["-0.26,39.96"].priority).toBe(newPriority);
    });

    it("e4_changePlacePriority_oldPriority<newPriority&newPriority=numberOfPlaces//2_noChange", async function(){
        let placeKey = "-35.93,-5.95";
        let newPriority = 2;
        await pm.changePlacePriority(placeKey, newPriority, uid);
        let userPlaces = await (await db.collection('users').doc(uid).get()).get('places');
        expect(userPlaces["-35.93,-5.95"].priority).toBe(newPriority);
        expect(userPlaces["-1.11,40.34"].priority).toBe(3);
        expect(userPlaces["-0.26,39.96"].priority).toBe(0);
        expect(userPlaces["-0.04,39.99"].priority).toBe(1);
    });

})
