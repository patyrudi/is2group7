import api from './axiosConfig'; 

export const getAllLists = () => api.get('/listas/');

export const getList = (idLista) => api.get(`/listas/${idLista}/`);

export const createList = (List) => api.post('/listas/', List);

export const deleteList = (idLista) => api.delete(`/listas/${idLista}/`);

export const updateList = (idLista, List) => api.patch(`/listas/${idLista}/`, List);