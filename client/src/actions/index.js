import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signUp = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/signup', formProps);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email is in use'
    });
  }
};

export const signIn = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/signin', formProps);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid email or password'
    });
  }
};

export const signOut = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  }
};