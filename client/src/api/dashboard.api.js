import api from './axiosConfig';

export const taskPerState = (idTablero) => api.get(`/tareas_estado/${idTablero}`);

export const taskExpired = (idTablero) => api.get(`/tareas_atrasadas/${idTablero}`);

export const taskPerUser = (idTablero) => api.get(`/tareas_por_usuario/${idTablero}`);

