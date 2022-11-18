import { AuthManager } from '../lib/model/AuthManager.js';
import { UserManager } from '../lib/model/UserManager.js';

describe('R01-H3-UserLogOut', () => { 
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

    it('e1_Con_Usuario_Logeado_BIEN', () => {
        let loggedUser = am.login(email, password);
        expect(am.isLoggedIn(loggedUser)).toEqual(true);

        am.logout();
        expect(am.isLoggedIn(loggedUser)).toEqual(false);
    });

    it('e2_Sin_Usuarios_MAL', () => {
        expect(function(){am.logout();}).toThrow(new Error("SessionNotFoundException"));
    });
});