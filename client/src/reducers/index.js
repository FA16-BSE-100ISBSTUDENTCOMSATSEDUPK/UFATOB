import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import request from './request';
import university from './university';
import student from './student';
import complaint from './complaint';

export default combineReducers({
  alert,
  auth,
  profile,
  request,
  university,
  student,
  complaint,
});
