import api from './axiosConfig';

export const getAllAssignedUsers = () => api.get('/usuarios_asignados/');