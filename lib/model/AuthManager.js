import { User } from "./User.js";

class AuthManager {
    
    constructor(isLogged = false) {
        this.isLogged = isLogged;
    }

    login(email, password) {
        return new User();
    }

    isLoggedIn(user) {
        return false;
    }

}

export { AuthManager };