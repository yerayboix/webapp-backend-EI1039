import {UserManager} from '../lib/model/UserManager.js';
import { auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';


describe("R01-H01-RegisterUser", function(){
    let email;
    let password;
    let userManager = new UserManager();

    beforeEach(function(){
        email = "test@uji.es";
        password = "123456";
    })

    afterAll(function(){
        //userManager.deleteUser(email);
    })

    it("registerUser_nonExistentUser_userAdded", async function(){
        let response = await userManager.registerUser(email, password);
        expect(response).toBe('Success');
    })

    // it("registerUser_existentUser_UserAlreadyExistsException", async function(){
    //     expect(async function(){ userManager.registerUser(email, password); }).toThrow('UserAlreadyExists');
    // })

})
