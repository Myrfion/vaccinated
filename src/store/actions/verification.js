import firebase from '@react-native-firebase/app';
import fireStore from '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import '@react-native-firebase/auth';
import {
  SET_VACCINE_PROOF,
  SET_IDENTITY_PROOF,
  SET_PHOTO_PROOF,
  SET_PERSONAL_INFO,
} from '../constants/verification';
import FirebaseService from '../../services/FirebaseService';

export function setVaccineProof(proof) {
  return {
    type: SET_VACCINE_PROOF,
    payload: proof,
  };
}

export function setIdentityProof(proof) {
  return {
    type: SET_IDENTITY_PROOF,
    payload: proof,
  };
}

export function setPhotoProof(proof) {
  return async dispatch => {
    dispatch({
      type: SET_PHOTO_PROOF,
      payload: proof,
    });
    dispatch(submitDocuments());
  };
}

export function setPersonalInfo(info) {
  return {
    type: SET_PERSONAL_INFO,
    payload: info,
  };
}

export function submitDocuments() {
  return async (_, getState) => {
    const {verification} = getState();
    const {photo, vaccine, identity, personalInfo} = verification;

    await FirebaseService.uploadDocuments(photo, vaccine.uri, identity.uri);
    await FirebaseService.writePersonalInfo(personalInfo);
  };
}
