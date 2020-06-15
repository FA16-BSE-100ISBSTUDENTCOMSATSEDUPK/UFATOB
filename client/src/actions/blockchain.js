import axios from 'axios';
import {
  ALL_BLOCKCHAINS_LOADED,
  BLOCKCHAIN_ERROR,
  ALL_TRANSACTIONS_LOADED,
  ALL_TRANSACTIONS_LOADED_FOR_USER,
  TRANSACTION_CREATED,
} from './types';
import { setAlert } from './alert';

// Get all the blockhains
export const getAllBlockchains = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blockchain');

    dispatch({
      type: ALL_BLOCKCHAINS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the transactions for a blockchain
export const getAllTransactions = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/blockchain/transactions/${id}`);

    dispatch({
      type: ALL_TRANSACTIONS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the transactions for user
export const getAllTransactionsForUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blockchain/my-transactions');

    dispatch({
      type: ALL_TRANSACTIONS_LOADED_FOR_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the transactions for user
export const createTransaction = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/blockchain/transaction', formData, config);

    dispatch({ type: TRANSACTION_CREATED });

    dispatch(setAlert('Transaction created', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
  }
};
