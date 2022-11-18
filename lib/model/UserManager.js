import { User } from "./User.js";

class UserManager {
    
    registerUser(email, password) {
        return new User();
    }

    setDataBaseAdapter(dbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    getUser(email) {

    }

    deleteUser(email) {

    }

}

export { UserManager };