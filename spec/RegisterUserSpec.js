import {UserManager} from '../lib/model/UserManager.js';

describe("R01-H01-RegisterUser", function(){
    let email;
    let password;
    let userManager = new UserManager();

    beforeEach(function(){
        email = "test@uji.es";
        password = "1234";
    })

    afterAll(function(){
        userManager.deleteUser(email);
    })

    it("registerUser_nonExistentUser_userAdded", function(){
        let newUser = userManager.registerUser(email, password);

        expect(newUser).not.toBe(undefined);
    })

    it("registerUser_existentUser_UserAlreadyExistsException", function(){
        expect(function(){ userManager.registerUser(email, password); }).toThrow(new Error("UserAlreadyExists"));
    })

})
