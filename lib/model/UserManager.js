import { db, auth } from '../../config/firebase';


class UserManager{
    
    registerUser(email, password){

    }

    getUser(){

    }

    deleteUser(){
    }

    changePassword(UID, newPassword){
        let mssg;
        auth.updateUser(UID,newPassword)
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully changing password');
            mssg = {
                mssg: 'Success',
              };        
          })
          .catch((error) => {
            console.log('Error changing password:', error);
            mssg = {
              mssg: 'Error',
            };
            throw UnableToChangePassword;
          });
        return mssg;
    }

}

export {UserManager};