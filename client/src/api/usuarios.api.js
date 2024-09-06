import api from './axiosConfig';
/**no toquen mas */

export const getAllUsers = () => api.get('/usuarios/');

export const getUser = (idUsuario) => api.get(`/usuarios/${idUsuario}`);

export const createUser = (user) => api.post('/usuarios/',user);

export const deleteUser = (idUsuario) => api.delete(`/usuarios/${idUsuario}/`);

export const updateUser = (idUsuario, user) => api.patch(`/usuarios/${idUsuario}/`, user);

export const getUserIdByUsername = (username) => api.get(`/usuario/${username}/id/`);