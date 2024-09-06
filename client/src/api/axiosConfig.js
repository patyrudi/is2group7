import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/forutask/api/v1/';
const REFRESH_URL = 'http://localhost:8000/forutask/api/token/refresh/';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir el token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores 401 y refrescar el token si es necesario
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(REFRESH_URL, { refresh: refreshToken });
        localStorage.setItem('access_token', response.data.access);
        api.defaults.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Redirigir al usuario a la página de inicio de sesión si el refresco falla
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
