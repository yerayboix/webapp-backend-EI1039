import { UserManager } from '../lib/model/UserManager.js';
import { auth } from "../config/firebase.js";
import { db } from "../config/firebase.js";

describe('R01-H3-GetUserData', () => {
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
                servicesByDefault: [true, true, true]
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

    it('e1_getUserData_userExists', async() => {
        try {
            let data = await um.getProfile(uid);
            let userData = {
                email: email,
                servicesByDefault: [true, true, true],
                UID: uid
            }
            expect(data).toEqual(userData);
        } catch (error) {
            console.log('Error en getUserData_userExists: '+error);
        }
    });

    it('e2_getUserData_userNotExists', async() => {        
        try {
            let data = await um.getProfile('jashidyudqwdkj123');
            let userData = {
                UID: uid,
                email: email,
                servicesByDefault: [true, true, true]
            }
        } catch (error) {
            expect(error).toBe('UserNotRegistered');
        }
    });
});