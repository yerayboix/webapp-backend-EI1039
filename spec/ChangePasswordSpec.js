import { AuthManager } from "../lib/model/AuthManager.js";
import { UserManager } from "../lib/model/UserManager.js";
import { auth } from '../config/firebase.js';
import { User } from "../lib/model/User.js";
import { db } from '../config/firebase.js';

describe('R01-H04-ChangePassword', function(){
    let email; 
    let uid;
    let authenticatorManager = new AuthManager();
    let user;
    let userManager = new UserManager();

    beforeEach(async function(){
        await auth.createUser({
            email: 'test@uji.es',
            password: '123456'
        }).then((userRecord) => {
            email = userRecord.email;
            uid = userRecord.uid;
        }).catch((error => {
            console.log(error.message);
        }))
    })

    afterEach(async function(){
        //userManager.deleteUser(email);
        await auth.getUserByEmail('test@uji.es')
        .then(async (userRecord) => {
            auth.deleteUser(userRecord.uid);
            await db.collection('users').doc(userRecord.uid).delete();
        }).catch((error) => {
            //console.log(error);
        })
    });

    it("changePassword_validPassword_passwordChanged", async function(){
        let response = await userManager.changePassword(uid, "1234567");
        expect(response).toEqual('Success');
    })

    
    it("changePassword_invalidPassword_InvalidPasswordException", async function(){
        try {
            await userManager.changePassword(uid, "1234");
        } catch (error) {
            expect(error).toBe('InvalidPassword');
        }
    })
 })