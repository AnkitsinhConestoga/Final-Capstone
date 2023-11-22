import database from '@react-native-firebase/database';
import { USER } from '../Model/UserModel';
import PostModel from '../Model/PostModel';

class FirebaseDatabaseManager {

    async saveUserData (user:USER) {
        await database().ref(`users/${user.userId}`).set(user);
    }
    async savePostData (postId:string,post:PostModel) {
      await database().ref(`posts/${postId}`).set(post);
  }

    generateId(){
        // const newId = ;
        // console.log(newId);
      return database().ref('post').push().key;
    }

    async  getUserData(id:string){
        try {
            const snapshot = (await database().ref('users').child(id).once('value')).val();
            console.log("snap details ",snapshot);
           
          
            // Set the properties of the existing USER object
            USER.updateName(snapshot.name || '');
            
            USER.updateFirstName(snapshot.firstName ? snapshot.firstName : '');
            USER.updateLastName(snapshot.lastName ? snapshot.lastName : '');
            USER.updateEmail(snapshot.email || '');
            USER.updateUserId(snapshot.userId || '');
            USER.updateCountryCode(snapshot.countryCode || 'CA');
            USER.updateCallingCode(snapshot.callingCode || '1');
            USER.updatePhone(snapshot.phone || '',)
            USER.updateGender(snapshot.gender || '');
            USER.updateLoginProvider(snapshot.loginProvider || '');
            USER.updateIsChecked(snapshot.isChecked || false);
            USER.updateProfileUrl(snapshot.profileUrl || '');
            USER.updateStreetName(snapshot.streetName || '');
            USER.updateCityName(snapshot.cityName || '');
            USER.updatePostalCode(snapshot.postalCode || '');
            return snapshot;
          } catch (error) {
            console.error('Error reading data:', error);
            return error;
          }
        
    }
}

export default new FirebaseDatabaseManager();
