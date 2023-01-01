import {PlaceManager} from '../lib/model/PlaceManager.js';
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe("R01-H04-RegisterPlaceInUserList", function(){
    let email; 
    let uid;
    let user;
    let pm = new PlaceManager();

    beforeAll( async function(){
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
                places:{}
            })
        }).catch((error => {
            console.log(error.message);
        }))
    });

    afterAll(async function(){
       await auth.getUserByEmail('test@uji.es')
       .then(async (userRecord) => {
           auth.deleteUser(userRecord.uid);
           await db.collection('users').doc(userRecord.uid).delete();
       }).catch((error) => {
           //console.log(error);
       })
    });

    it("addPlace_validUserDataAndNotInList_placeAdded", async function(){
        let response = await pm.addPlace(uid,[ -0.26 , 39.96 ],"Onda");
        expect(response).toEqual('Success');
    });

    it("addPlace_validUserDataAndAlreadyInList_PlaceInListException", async function(){
        try{
            await pm.addPlace(uid,[ -0.26 , 39.96 ],"Onda");
            fail("Didn't throw exception");
        } catch(error){
            expect(error).toBe('PlaceInList');
        }
        
    });

})
