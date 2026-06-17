// this file contains all the api calls related to authentication such as login, register, logout and getMe.
// It uses axios to make HTTP requests to the backend server and handles the responses accordingly.

import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://localhost:3000',
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post('/api/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const response = await api.post('/api/auth/logout');
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    const response = await api.get('/api/auth/get-me', {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
