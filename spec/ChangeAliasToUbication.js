import { UserManager } from "../lib/model/UserManager.js";
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe('R02-H05-ChangeAliasToUbication', function(){
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
                places : {}
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

    it("changeAliasToUbication_ubicationInList_aliasChanged", async function(){
        let response = await userManager.changeAliasToUbication(uid,[ -0.26 , 39.96 ], "casa");
        expect(response).toEqual('Success');
    })

    
    it("changeAliasToUbication_ubicationNotInList_ubicationNotInListException", async function(){
        try{
            await userManager.changeAliasToUbication(uid, [0,0], "AE");
            fail("Didn't throw exception");
        }  catch(error){
            expect(error).toBe('UbicationNotInList');
        }      
        
    })
 })