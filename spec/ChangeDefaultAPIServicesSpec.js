import { UserManager } from "../lib/model/UserManager.js";
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';

describe('R04-H03-ChangeDefaultAPIServices', function(){
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
                places:{}
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

    it("changeDefaultAPIServices_changedCorrectly", async function(){
        let response = await userManager.changeDefaultAPIServices(uid, [false, null, true]);
        expect(response).toEqual('Success');
    })

 })