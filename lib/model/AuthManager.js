import { User } from "./User.js";
import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";
import userException from "./ExceptionManager.js";

class AuthManager{

    constructor(){
        this.firebaseAuth = auth;
        this.database = db;
    }

    async login(uid){
        let user;
        await this.firebaseAuth.getUser(uid)
        .then((userData) => {
            user = new User(userData.email, userData.uid);
            user.logged = true;
            return user;
        })
        .catch((error => {
            console.log(userException(error.message));
            throw userException(error.message);
        }));
        return user;
    }

    isLoggedIn(user){
        return user.logged;
    }

}
export{AuthManager};