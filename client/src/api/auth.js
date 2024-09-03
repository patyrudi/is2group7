import axios from 'axios';

const API_URL = 'http://localhost:8000/forutask_api/token/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post('http://localhost:8000/forutask_api/token/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};
