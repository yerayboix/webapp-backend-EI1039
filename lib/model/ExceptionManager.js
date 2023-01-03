//Funcion que trata los errores provenientes de las API o la base de datos y lo formatea a nuestro criterio
export default function exceptionManager(errorMessage){
    if(errorMessage === 'The email address is already in use by another account.') return 'UserAlreadyExists';
    else if(errorMessage === 'The password must be a string with at least 6 characters.') return 'InvalidPassword';
    else if(errorMessage === 'The email address is improperly formatted.') return 'InvalidEmail';
    else if(errorMessage === 'There is no user record corresponding to the provided identifier.') return 'UserNotRegistered';
    else if(errorMessage === '"lat" must be less than or equal to 90') return 'InvalidLatitude';
    else if(errorMessage === '"lon" must be less than or equal to 180') return 'InvalidLongitude';
    else if(errorMessage === 'This user already has this place in their list.') return 'PlaceInList';
    else if(errorMessage === 'This user does not have this place in their list.') return 'PlaceNotInList';
    else if(errorMessage === 'This user has no places registered.') return 'NoPlacesInList';
    return 'Error: { '+errorMessage+ ' } no tratado';
}

