import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import {format} from 'date-fns';

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

const FirebaseService = {
  uploadDocuments: async (photo, vaccine, identity) => {
    const id = await FirebaseService.getUserId();

    const photoRef = storage().ref(
      `${id}-photo-proof.${getFileExtension(photo)}`,
    );
    const vaccinationRef = storage().ref(
      `${id}-vaccination-proof.${getFileExtension(vaccine)}`,
    );
    const identityRef = storage().ref(
      `${id}-identity-proof.${getFileExtension(identity)}`,
    );

    try {
      await photoRef.putFile(photo);
      await vaccinationRef.putFile(vaccine);
      await identityRef.putFile(identity);
    } catch (error) {
      console.log(error);
    }
  },
  writePersonalInfo: async info => {
    function formatDate(date) {
      return format(date, 'yyyy-MM-dd');
    }

    const {uid} = auth().currentUser;

    await fireStore()
      .collection('Users')
      .doc(uid)
      .set({
        ...info,
        dateOfBirth: formatDate(info.dateOfBirth),
        vaccinationStatus: 'verification',
      });
  },
  fetchPersonalInfo: async () => {
    const id = await FirebaseService.getUserId();

    const info = await fireStore()
      .collection('Users')
      .doc(id)
      .get();

    if (info.exists) {
      const photo = await storage()
        .ref(`${id}-photo-proof.jpg`)
        .getDownloadURL();

      return {...info.data(), photo, id};
    }

    return null;
  },
  getUserId: async () => {
    return auth().currentUser.uid;
  },
};

export default FirebaseService;
