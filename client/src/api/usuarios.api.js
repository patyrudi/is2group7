import api from './axiosConfig';

export const getAllUsers = () => api.get('/usuarios/');

export const getUser = (idUsuario) => api.get(`/usuarios/${idUsuario}`);

export const createUser = (user) => api.post('/usuarios/',user);

export const deleteUser = (idUsuario) => api.delete(`/usuarios/${idUsuario}`);

export const updateUser = (idUsuario, user) => api.put(`/usuarios/${idUsuario}/${user}`);