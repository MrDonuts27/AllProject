import { firestore } from './index';

export const updateProfilePicture = (userId, profilePictureUrl) => {
  firestore.collection('users').doc(userId).update({ profilePicture: profilePictureUrl });
};