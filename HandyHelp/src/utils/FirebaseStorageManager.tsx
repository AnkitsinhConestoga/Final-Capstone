import storage from '@react-native-firebase/storage';
import { USER } from '../Model/UserModel';
import { Platform } from 'react-native';

class FirebaseStorageManager {

    getImageExtension(url: string): string | null {
        const matches = url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
        return matches ? matches[1] : null;
    }

    async savePostMedia(mediaUrl: string[], postId: string): Promise<string[]> {
        const uploadedUrls: string[] = [];
        try {
            await Promise.all(mediaUrl.map(async (mediaLink, index) => {
                const filename =  mediaLink.substring(mediaLink.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? mediaLink.replace('file://', '') : mediaLink;

                try {
                    const snapshot =  storage().ref(`postImage/${postId}/${filename}`);
                    await snapshot.putFile(uploadUri);
                    const url = await snapshot.getDownloadURL();

                    if (url) {
                        uploadedUrls.push(url);
                    }

                    console.log('Image URL:', url);
                } catch (error) {
                    console.log("Got error while uploading image", error);
                }
            }));

            return uploadedUrls;
        } catch (error) {
            console.log("Got error while uploading profile_pic", error);
            return [];
        }

    }

    async saveUserData(profileImage: string, userId: string) {
        const filename = profileImage.substring(profileImage.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? profileImage.replace('file://', '') : profileImage;
        const fileExtension = filename.split('.')[1];
        const imageName = userId + '.' + fileExtension;
        console.log(imageName, ' path ', fileExtension);

        try {
            if (USER.profileUrl && !this.getImageExtension(USER.profileUrl)?.includes(fileExtension)) {
                const delimageName = userId + '.' + this.getImageExtension(USER.profileUrl);
                await storage().ref(`users/${delimageName}`).delete();
            }
            await storage().ref(`users/${imageName}`).putFile(uploadUri).then(async snapshot => {
                const url = await storage().ref(`users/${imageName}`).getDownloadURL().catch((error2) => {
                    console.log(error2);
                });
                if (url) {
                    USER.updateProfileUrl(url);
                }

                console.log('imag url ', url);

            }).catch(error => {
                console.log("Got error while uploading profile_pic", error.message);
            });
        } catch (error) {
            console.log("Got error while uploading profile_pic", error);
        }


    }


}

export default new FirebaseStorageManager();
