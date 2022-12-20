import { auth } from "../../config/firebase.js";
import { db } from "../../config/firebase.js";
import userException from "./ExceptionManager.js";

class UserManager {
  constructor() {
    this.firebaseAuth = auth;
    this.database = db;
  }

  async deleteUser(uid) {
    return await this.firebaseAuth.deleteUser(uid)
      .then(async () => {
        await db.collection('users').doc(uid).delete();
        return "Success";
      })
      .catch((error) => {
        return userException(error.message);
      });
  }
}

export { UserManager };
