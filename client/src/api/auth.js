import axios from 'axios';

const API_URL = 'http://localhost:8000/forutask/api/token/';
const REFRESH_URL = 'http://localhost:8000/forutask/api/token/refresh/';
const REGISTRO_URL = 'http://localhost:8000/forutask/api/registro/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    
    const { access, refresh, idUsuario  } = response.data; 
    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem("idUsuario", idUsuario);

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

export const register = async (nombreUsuario, apellidoUsuario, correoUsuario, username, password) => {
  try {
    const response = await axios.post(REGISTRO_URL, {
      nombreUsuario,
      apellidoUsuario,
      correoUsuario,
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
