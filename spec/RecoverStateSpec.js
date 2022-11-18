import { User } from "../lib/model/User.js";
import { UserManager } from "../lib/model/UserManager.js";
import { AuthManager } from "../lib/model/AuthManager.js";
import { DataBaseAdapter } from "../lib/model/DataBaseAdapter.js";

describe("R05-H01-RecoverState",function(){
    it("RecoverStateUser_dataBaseAvailable_dataRecovered",function(){
        let userManager = new UserManager();
        userManager.setDataBaseAdapter(new DataBaseAdapter());
        let testUser = userManager.registerUser("test@uji.es", "1234");

        testUser.setEmail("test2@uji.es");

        userManager = new UserManager();
        userManager.setDataBaseAdapter(new DataBaseAdapter());
        let authManager = new AuthManager();
        authManager.setDataBaseAdapter(new DataBaseAdapter());
        testUser = authManager.login("test2@uji.es","1234");
        expect(testUser.getEmail()).toBe("test2@uji.es");
    })
    it("RecoverStateUser_dataBaseUnavailable_DataBaseUnavailableException", function(){
        expect(function(){
            let userManager = new UserManager();
            userManager.setDataBaseAdapter(null);
            let testUser = userManager.registerUser("test@uji.es", "1234");
        }).toThrow(new Error("DataBaseUnavailableException"));
    })
})