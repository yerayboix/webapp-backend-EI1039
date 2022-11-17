import { AuthManager } from '../lib/model/AuthManager.js';
import { UserManager } from '../lib/model/UserManager.js';

describe('R01-H6-DeleteUser', () => { 
    let email, password;
    let am = new AuthManager();
    let um = new UserManager();
    

    beforeEach(() => {
        email = "test@uji.es";
        password = "1234";
        um.registerUser(email,password);
    });

    afterAll(() => {
        um.deleteUser(email);
    });

    it('e1_deleteUser_oneUserOnSystem_userIsLoggedIn_userDeleted', () => {
        let loggedUser = am.login(email, password);
        expect(am.isLoggedIn(loggedUser)).toEqual(true);

        um.deleteUser(email);
        expect(um.getUser(email)).toBeNull();
    });

    it('e2_deleteUser_noUserOnSystem_SessionNotFoundException', () => {
        um.deleteUser(email);
        expect(um.getUser(email)).toBeNull();

        expect(function(){ um.deleteUser(email) }).toThrow(new Error('SessionNotFound'));
    });

});