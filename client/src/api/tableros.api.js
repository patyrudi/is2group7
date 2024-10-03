import api from './axiosConfig';

export const getAllboards = () => api.get('/tableros/');

export const getBoard = (idTablero) => api.get(`/tableros/${idTablero}/`);

export const createBoard = (board) => api.post('/tableros/', board);

export const deleteBoard = (idTablero) => api.delete(`/tableros/${idTablero}/`);

export const updateBoard = (idTablero, board) => api.patch(`/tableros/${idTablero}/`, board);