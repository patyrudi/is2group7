import axios from 'axios';

const API_URL = 'http://localhost:8000/forutask/api/token/';
const REFRESH_URL = 'http://localhost:8000/forutask/api/token/refresh/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(REFRESH_URL, {
      refresh: localStorage.getItem('refresh_token'),
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};