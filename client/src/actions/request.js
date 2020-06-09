import axios from 'axios';
import { setAlert } from './alert';
import {
  ALL_REQUESTS_LOADED_FOR_USER,
  REQUEST_ERROR,
  REQUEST_LOADED,
  REQUEST_CREATED,
  ALL_REQUESTS_LOADED_FOR_UNIVERSITY,
  REQUEST_FORWARDED,
} from './types';

//Create fund request
export const createRequest = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/requests', formData, config);

    dispatch({
      type: REQUEST_CREATED,
      payload: res.data,
    });

    dispatch(setAlert('Request Created', 'success'));

    history.push('/user/requests');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get all requests for user
export const getUserRequests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/requests/user');

    dispatch({
      type: ALL_REQUESTS_LOADED_FOR_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all requests for university
export const getUniversityRequests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/requests/university');

    dispatch({
      type: ALL_REQUESTS_LOADED_FOR_UNIVERSITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get request by id
export const getRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/requests/${id}`);

    dispatch({
      type: REQUEST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Forwared request to HEC
export const forwardRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/requests/forward/${id}`);

    dispatch({
      type: REQUEST_FORWARDED,
      payload: res.data,
    });

    console.log(res.data);

    dispatch(setAlert('Request forwarded', 'success'));
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
