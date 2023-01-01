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

    it("changeAliasToPlace_placeInList_aliasChanged", async function(){
        let response = await pm.changeAliasToPlace(uid,[ -0.26 , 39.96 ], "casa");
        expect(response).toEqual('Success');
    })

    
    it("changeAliasToPlace_placeNotInList_placeNotInListException", async function(){
        try{
            await pm.changeAliasToPlace(uid, [0,0], "AE");
            fail("Didn't throw exception");
        }  catch(error){
            expect(error).toBe('PlaceNotInList');
        }      
        
    })
 })