import {UserManager} from '../lib/model/UserManager.js';
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe("R01-H04-RegisterUbicationInUserList", function(){
    let email; 
    let uid;
    let user;
    let userManager = new UserManager();

    beforeEach( async function(){
        await auth.createUser({
            email: 'test@uji.es',
            password: '123456'
        }).then((userRecord) => {
            email = userRecord.email;
            uid = userRecord.uid;
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

    it("addUbication_validUserDataAndNotInList_ubicationAdded", async function(){
        let response = await userManager.addUbication(uid,[ -0.26 , 39.96 ],"Onda");
        expect(response).toEqual('Success');
    });

    it("addUbication_validUserDataAndAlreadyInList_UbicationInListException", async function(){
        let response = await userManager.addUbication(uid,[ -0.26 , 39.96 ],"Onda");
        try{
            await userManager.addUbication(uid,[ -0.26 , 39.96 ],"Onda");
            fail("Didn't throw exception");
        } catch(error){
            expect(error).toBe('UbicationInList');
        }
        
    });

})
