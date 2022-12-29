export default function exceptionManager(errorMessage){
    if(errorMessage === 'The email address is already in use by another account.') return 'UserAlreadyExists';
    else if(errorMessage === 'The password must be a string with at least 6 characters.') return 'InvalidPassword';
    else if(errorMessage === 'The email address is improperly formatted.') return 'InvalidEmail';
    else if(errorMessage === 'There is no user record corresponding to the provided identifier.') return 'UserNotRegistered';
    else if(errorMessage === 'This user already has this place in their list.') return 'PlaceInList';
    return 'Error: { '+errorMessage+ ' } no tratado';
}