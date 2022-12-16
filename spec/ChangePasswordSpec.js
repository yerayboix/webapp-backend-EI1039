import { AuthManager } from "../lib/model/AuthManager.js";
import { User } from "../lib/Model/User.js";
import { UserManager } from '../lib/model/UserManager.js'

describe('R01-H04-ChangePassword', function(){ 
    let email;
    let password;
    let authenticatorManager = new AuthManager();
    let user;
    let userManager = new UserManager();

    beforeEach(function(){
        email = "test@uji.es";
        password = "123456";
        userManager.registerUser(email, password);
        user = userManager.getUser(email);
    })
    afterEach(function(){
        userManager.deleteUser(email);
    })

    it("changePassword_validPassword_passwordChanged", function(){
        let newPassword = "12345";
        user = authenticatorManager.login(email, password);

        expect(authenticatorManager.isLoggedIn()).toEqual(true);
        user.setPassword(newPassword);

        expect(user.getPassword()).toEqual(newPassword);
    })

    
    it("changePassword_invalidPassword_InvalidPasswordException", function(){
        user = authenticatorManager.login(email, password);

        expect(authenticatorManager.isLoggedIn()).toEqual(true);
        expect(function(){ user.setPassword(password); }).toThrow(new Error("InvalidPassword"));
    })
 })