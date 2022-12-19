import { AuthManager } from "../lib/model/AuthManager.js";
import { UserManager } from "../lib/model/UserManager.js";
import { auth } from '../config/firebase.js';
import { User } from "../lib/model/User.js";
import { db } from '../config/firebase.js';

describe("R01-H02-LogIn",function(){
    let email;
    let userManager = new UserManager();
    let authManager = new AuthManager();
    let uid;

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

    it("logIn_userExists_userLoggedIn", async function(){
        let loggedUser = await authManager.login(uid);
        expect(loggedUser.email).toBe('test@uji.es');
        expect(authManager.isLoggedIn(loggedUser)).toBe(true);
    })

    it("logIn_userNotExists_UserNotRegisteredException", async function(){
        try {
            await authManager.login('asdhad78aw7912hasd');
        } catch (error) {
            expect(error).toBe('UserNotRegistered');
        }
        
    })
})