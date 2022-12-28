import { PlaceManager } from '../lib/model/PlaceManager.js';
import { auth } from "../config/firebase.js";
import { db } from "../config/firebase.js";

describe('R02-H06-ChangePlaceVisibility', () => {
    let email, password, uid;
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
                places:{
                    "-0.26,39.96":{
                        alias:"casa",
                        name:"Onda",
                        services:[true, true, true],
                        visible:false
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

    it('changePlaceVisibility_placeInList_visibilityChanged', async() => {
        let response = await pm.changeVisibility(uid, [ -0.26 , 39.96 ]);
        expect(response).toEqual('Success');
    });

    it('changePlaceVisibility_placeNotInList_placeNotInListException', async() => {        
        try {
            await pm.changeVisibility(uid, [ 0 , 0 ]);
            fail("Didn't throw exception");
        } catch (error) {
            expect(error).toBe('PlaceNotInList');
        }
    });
});