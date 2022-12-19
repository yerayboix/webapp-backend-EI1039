import {UserManager} from '../lib/model/UserManager.js';
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';


describe("R01-H01-RegisterUser", function(){
    let email;
    let password;
    let userManager = new UserManager();
    let uid;

    beforeEach(function(){
        email = "test@uji.es";
        password = "123456";
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

    it("registerUser_nonExistentUser_userAdded", async function(){
        let response = await userManager.registerUser(email, password);
        expect(response).toBe('Success');
    });

    it("registerUser_existentUser_UserAlreadyExistsException", async function(){
        try {
            await userManager.registerUser(email, password);
        } catch (error) {
            expect(error).toBe('UserAlreadyExists');
        }
    });

})
