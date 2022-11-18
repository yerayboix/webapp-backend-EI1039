<<<<<<< Updated upstream
import { User } from "./User.js";

class AuthManager {
    
    constructor(isLogged = false) {
        this.isLogged = isLogged;
    }

    setDataBaseAdapter(dbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    login(email, password) {
        return new User();
    }
    
    logout() {
        
    }

    isLoggedIn(user) {
        return false;
=======
class AuthManager {

    constructor(logged = false){
        this.logged = logged;
    }

    login(email, password){
        
    }
    
    logout(){
        
    }

    isLoggedIn(user){

>>>>>>> Stashed changes
    }

}

export { AuthManager };