import { UserManager } from "../lib/model/UserManager.js";
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';


describe('R01-H6-DeleteUser', () => { 
    let email, password, uid;
    let um = new UserManager();
    

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
                places: {}
            })
        }).catch((error => {
            console.log(error.message);
        }))
    })

    it('e1_deleteUser_oneUserOnSystem_userIsLoggedIn_userDeleted', async () => {
        try {
            let response = await um.deleteUser(uid);
            expect(response).toBe('Success');
        } catch (error) {
            console.log(error);
        }
    });

    it('e2_deleteUser_noUserOnSystem_UserNotRegisteredException', async () => {
        let fakeUid = 'aad22fasfgqe';
        try {
            await um.deleteUser(fakeUid);
        } catch (error) {
            console.log(error);
            expect(error).toBe('UserNotRegistered');
        }
    });

});