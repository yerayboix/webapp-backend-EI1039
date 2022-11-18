import { User } from "./User.js";

class AuthManager{

    login(email, password){
        return new User();
    }

    isLoggedIn(){
        return false;
    }

}
export{AuthManager};