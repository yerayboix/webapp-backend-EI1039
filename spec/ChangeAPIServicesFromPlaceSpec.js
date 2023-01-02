import { UserManager } from "../lib/model/UserManager.js";
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe('R04-H02-ChangeAPIServicesFromPlace', function(){
    let email; 
    let uid;
    let user;
    let userManager = new UserManager();

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

    it("changeAPIServicesFromPlace_placeInList_servicesChanged", async function(){
        let response = await userManager.changeDefaultAPIServices(uid, [ -0.26 , 39.96 ] , [false, null, true]);
        expect(response).toEqual('Success');
    })

    it("changeAPIServicesFromPlace_placeNotInList_placeNotInListException", async function(){
        try{
            let response = await userManager.changeDefaultAPIServices(uid, [0,0] , [false, null, true]);
            fail("Didn't throw exception");
        }catch(error){
            expect(error).toBe('PlaceNotInList');
        }
        
    })

 })