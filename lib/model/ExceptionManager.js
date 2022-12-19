//Funcion que transforma la exception de Firebase a una que podamos tratar usando nuestro convenio
export default function userException(errorMessage){
    if(errorMessage === 'The email address is already in use by another account.') return 'UserAlreadyExists';
    else if(errorMessage === 'The password must be a string with at least 6 characters.') return 'InvalidPassword';
    else if(errorMessage === 'The email address is improperly formatted.') return 'InvalidEmail';

}