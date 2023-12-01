import database from '@react-native-firebase/database';
import firestore, { Filter, firebase } from '@react-native-firebase/firestore'
import { USER } from '../Model/UserModel';
import PostModel from '../Model/PostModel';
import { Geopoint, distanceBetween, geohashQuery, geohashQueryBounds } from 'geofire-common';
import { Status } from './Utils';
import ChatData from '../Model/ChatData';
import ContactModel from '../Model/ContactModel';
import ComplainModel from '../Model/ComplainModel';

class FirebaseDatabaseManager {

  async saveUserData(user: USER) {
    await database().ref(`users/${user.userId}`).set(user);
  }
  async savePostData(postId: string, post: PostModel) {
    await firestore().collection(`posts`).doc(postId).set(post);
  }

  async saveVeriData(postId:string,post: any) {
    await firestore().collection(`verification`).doc(postId).set(post);
    

  }


  async saveContactData(post: ContactModel) {
    const newReference = database().ref(`ContactRequest`).push();
    await newReference.set(post);
  }

  async saveComplainData(post: ComplainModel) {
    const newReference = database().ref(`ComplainRequest`).push();
    await newReference.set(post);
  }

  async updateStatusPostData(postId: string, post: PostModel) {
    await firestore().collection(`posts`).doc(postId).set(post);
    await firestore().collection(`workingPosts`).doc(postId).set(post);
  }

  async fetchChatData(currentUserId: string) {
    try {
      const chatDataList: ChatData[] = [];
      console.log("chat", "called caht")
      await firestore()
        .collection('chats')
        .where('chatHead.users', 'array-contains', currentUserId)
        .orderBy('lastMessage.timestamp', 'desc') // Order by timestamp in Lastseen in descending order
        .get().then((snapshot) => {
          console.log("TAGS", snapshot);
          snapshot.docs.forEach((doc) => {
            const chatData = doc.data() as ChatData;
            chatDataList.push(chatData);
          });
        })





      return chatDataList;
    } catch (error) {
      console.error('Error fetching chat data:', error);
      throw error;
    }
  };

  async getUserPost(userId: string): Promise<PostModel[]> {
    try {
      const matchingDocs: PostModel[] = [];
      console.log("TAGS", "calling data", userId);

      await firestore().collection('posts').orderBy('authorId').where('authorId', '==', userId).get().then((snapshot) => {
        console.log("data sna", snapshot.docs);
        snapshot.forEach((doc) => {
          const data = doc.data() as PostModel;
          console.log("current data ", data);
          if (data.postStatus == Status.Published) {
            matchingDocs.push(data);
          }


        });
      }).catch((error) => {
        console.log("get user error ", error);
      });

      return matchingDocs;
    } catch (error) {
      console.error('Error fetching users: ', error);
      return [];
    }

  }

  async getVerifiedPost(): Promise<any[]> {
    const matchingDocs: any[] = [];

  

    await firestore().collection('verification').orderBy('user.isVerified').where('user.isVerified', '==', true).get().then((snapshot) => {
      console.log("data sna", snapshot.docs);
      snapshot.forEach((doc:any) => {
        console.log("uer",doc.data());
       matchingDocs.push(doc.data());
        

      });
    }).catch((error) => {
      console.log("get user error ", error);
    });

    return matchingDocs;

    const snapshot = await database().ref('users').orderByChild('isVerified').once('value');
    if (!snapshot.exists()) {
      console.log('No users found.');
      return [];
    }

    // Process the user data
    const users = Object.values(snapshot.val());
    console.log(users);





    return matchingDocs;

  }

  async getUpcomingPost(userId: string): Promise<PostModel[]> {
    const matchingDocs: PostModel[] = [];
    console.log("TAGS", "calling data", userId);

    await firestore().collection('posts').orderBy('workerId').where('workerId', '!=', "").get().then((snapshot) => {
      console.log("data sna", snapshot.docs);
      snapshot.forEach((doc) => {
        const data = doc.data() as PostModel;
        console.log("current data ", data);
        if (data.postStatus == Status.Approved) {
          matchingDocs.push(data);
        }

      });
    }).catch((error) => {
      console.log("get user error ", error);
    });

    return matchingDocs;

  }

  async getCompletedPost(userId: string): Promise<PostModel[]> {
    const matchingDocs: PostModel[] = [];
    console.log("TAGS", "calling data", userId);

    await firestore().collection('posts').orderBy('postStatus').where('postStatus', '==', Status.Completed).get().then((snapshot) => {
      console.log("data sna", snapshot.docs);
      snapshot.forEach((doc) => {
        const data = doc.data() as PostModel;
        if (data.authorId == userId || data.workerId == userId) {
          console.log("current data ", data);
          matchingDocs.push(data);
        }
      });
    }).catch((error) => {
      console.log("get user error ", error);
    });

    return matchingDocs;

  }

  async getCancelledPost(userId: string): Promise<PostModel[]> {
    const matchingDocs: PostModel[] = [];
    console.log("TAGS", "calling data", userId);

    await firestore().collection('posts').orderBy('postStatus').where('postStatus', '==', Status.Canceled).get().then((snapshot) => {
      console.log("data sna", snapshot.docs);
      snapshot.forEach((doc) => {
        const data = doc.data() as PostModel;
        if (data.authorId == userId || data.workerId == userId) {
          console.log("current data ", data);
          matchingDocs.push(data);
        }
      });
    }).catch((error) => {
      console.log("get user error ", error);
    });

    return matchingDocs;

  }

  async getPostData(lat: number, longt: number, userId: string): Promise<PostModel[]> {
    try {
      const radius = 50 * 1000;
      const bounds = geohashQueryBounds([lat, longt], radius);
      const matchingDocs: PostModel[] = [];

      for (const b of bounds) {
        const query = firestore()
          .collection('posts') // Replace with your collection name
          .orderBy('geohash')
          .startAt(b[0])
          .endAt(b[1]);

        const snapshot = await query.get();

        snapshot.docs.forEach((doc) => {

          const data = doc.data() as PostModel;

          const distance = distanceBetween([data.postLat, data.postLong], [lat, longt]);
          if (data.authorId != userId) {
            if (data.postStatus == Status.Published) {
              if (distance <= radius) {
                data.workDistance = distance;
                if (data.isForVerified) {
                  if (USER.isVerified) {
                    matchingDocs.push(data);
                  }
                } else {
                  matchingDocs.push(data);
                }
              }
            }

          }
        });
      }

      return matchingDocs;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  calculateDistance(centerLat: number, centerLong: number, pointLat: number, pointLong: number): number {
    const earthRadius = 6371; // Earth's radius in kilometers

    const latDistance = this.degreesToRadians(pointLat - centerLat);
    const lonDistance = this.degreesToRadians(pointLong - centerLong);

    const a =
      Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
      Math.cos(this.degreesToRadians(centerLat)) * Math.cos(this.degreesToRadians(pointLat)) *
      Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers

    return distance;
  }
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  generateId() {
    // const newId = ;
    // console.log(newId);
    return firestore().collection('post').doc().id;
  }

  generateVId() {
    // const newId = ;
    // console.log(newId);
    return firestore().collection('verification').doc().id;
  }


  generateCId() {
    // const newId = ;
    // console.log(newId);
    return database().ref('ContactRequest');
  }
  async getUserData(id: string) {
    try {
      const snapshot = (await database().ref('users').child(id).once('value')).val();
      console.log("snap details ", snapshot);


      // Set the properties of the existing USER object
      try {
        USER.updateName(snapshot.name || '');
      } catch (e) {
        console.log("error ", e)
      }


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
      USER.updateIsVerified(snapshot.isVerified || false);
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


  async getanotherUserData(id: string) {
    try {
      const snapshot = (await database().ref('users').child(id).once('value')).val();
      console.log("snap details ", snapshot);


      const tempUser = USER.createTemporaryUser();
      tempUser.name = snapshot.name || '';

      return snapshot;
    } catch (error) {
      console.error('Error reading data:', error);
      return error;
    }

  }
}

export default new FirebaseDatabaseManager();
