import {
  SET_PHOTO_PROOF,
  SET_VACCINE_PROOF,
  SET_IDENTITY_PROOF,
  SUBMIT_DOCS,
  SET_PERSONAL_INFO,
} from '../constants/verification';

const initState = {};

export default function verification(state = initState, action) {
  switch (action.type) {
    case SET_PHOTO_PROOF:
      return {
        ...state,
        photo: action.payload,
      };
    case SET_VACCINE_PROOF:
      return {
        ...state,
        vaccine: action.payload,
      };
    case SET_IDENTITY_PROOF:
      return {
        ...state,
        identity: action.payload,
      };
    case SET_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: action.payload,
      };
    case SUBMIT_DOCS:
      return {};
    default:
      return state;
  }
}
