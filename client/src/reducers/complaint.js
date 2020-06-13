import {
  ALL_COMPLAINTS_LOADED_FOR_USER,
  COMPLAINT_ERROR,
  COMPLAINT_LOADED,
  COMPLAINT_CREATED,
  // ALL_REQUESTS_LOADED_FOR_UNIVERSITY,
  // REQUEST_FORWARDED,
} from '../actions/types';

const initialState = {
  complaint: null,
  complaints: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_COMPLAINTS_LOADED_FOR_USER:
      // case ALL_REQUESTS_LOADED_FOR_UNIVERSITY:
      return {
        ...state,
        loading: false,
        errors: null,
        complaints: payload,
      };
    // case REQUEST_FORWARDED:
    //   return {
    //     ...state,
    //     loading: false,
    //     errors: null,
    //     complaints: [
    //       ...state.complaints.map((complaint) => {
    //         if (complaint._id === payload._id) {
    //           complaint.status = payload.status;
    //         }
    //         return complaint;
    //       }),
    //     ],
    //   };
    case COMPLAINT_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        complaint: payload,
      };
    case COMPLAINT_CREATED:
      return {
        ...state,
        loading: false,
        errors: null,
        complaints: [...state.complaints, payload],
      };
    case COMPLAINT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
