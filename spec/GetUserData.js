import { AuthManager } from '../lib/model/AuthManager.js';
import { UserManager } from '../lib/model/UserManager.js';

describe('R01-H3-GetUserData', () => { 
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

    it('e1_Con_Usuario_BIEN', () => {
        let loggedUser = am.login(email, password);
        
        expect(um.getUser(email)).toEqual(email);

        am.logout();
    });

    it('e2_Sin_Usuarios_MAL', () => {        
        um.deleteUser(email);        
        expect(um.getUser(email)).toThrow(new Error("SessionNotFoundException"))
    });
});