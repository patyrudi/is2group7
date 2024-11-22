import api from './axiosConfig';

export const getAllCards = () => api.get('/tarjetas/');

export const getCard = (idTarjeta) => api.get(`/tarjetas/${idTarjeta}/`);

export const createCard = (card) => api.post('/tarjetas/', card);

export const deleteCard = (idTarjeta) => api.delete(`/tarjetas/${idTarjeta}/`);

export const updateCard = (idTarjeta, card) => api.patch(`/tarjetas/${idTarjeta}/`, card);

export const searchCardsByUsername = (searchTerm) => {
    if (!searchTerm) {
        return api.get(`/buscar_tarjetas_por_usuario/`);
    } else {
        return api.get(`/buscar_tarjetas_por_usuario/?search_term=${searchTerm}`);
    }
};

export const searchCardsByEtiqueta = (searchTerm) => {
    if (!searchTerm) {
        return api.get(`/buscar_tarjetas_por_etiquetas/`);
    } else {
        return api.get(`/buscar_tarjetas_por_etiquetas/?search_term=${searchTerm}`);
    }
};
