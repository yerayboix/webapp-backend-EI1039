import { AuthManager } from "../lib/model/AuthManager.js";
import { UserManager } from "../lib/model/UserManager.js";
import { User } from "../lib/model/User.js";

describe("R01-H02-LogIn",function(){
    let authManager = new AuthManager();
    let userManager = new UserManager();
    let email;
    let password;

    it("logIn_userExists_userLoggedIn", function(){
        let testUser = userManager.registerUser("test@uji.es", "1234");

        let loggedUser = authManager.login("test@uji.es", "1234");

        expect(testUser.getEmail()).toBe(loggedUser.getEmail());
        expect(authManager.isLoggedIn()).toBe(true);

        userManager.deleteUser();
    })

    it("logIn_userNotExists_UserNotRegisteredException",function(){
        expect(function(){authManager.login("test@uji.es", "1234");}).toThrow(new Error("UserNotRegisteredException"));
    })
})