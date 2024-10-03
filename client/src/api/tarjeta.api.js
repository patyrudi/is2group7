import api from './axiosConfig';

export const getAllCards = () => api.get('/tarjetas/');

export const getCard = (idTarjeta) => api.get(`/tarjetas/${idTarjeta}/`);

export const createCard = (card) => api.post('/tarjetas/', card);

export const deleteCard = (idTarjeta) => api.delete(`/tarjetas/${idTarjeta}/`);

export const updateCard = (idTarjeta, card) => api.patch(`/tarjetas/${idTarjeta}/`, card);