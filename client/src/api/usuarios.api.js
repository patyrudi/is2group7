import api from './axiosConfig';

export const getAllWorkspaces = () => api.get('/espacios/');

export const getWorkspace = (idEspacio) => api.get(`/espacios/${idEspacio}`);

export const createWorkspace = (workspace) => api.post('/crearespacio/', workspace);

export const deleteWorkspace = (idEspacio) => api.delete(`/espacios/${idEspacio}`);

export const updateWorkspace = (idEspacio, workspace) => api.put(`/espacios/${idEspacio}`, workspace);

export const getAllAssignedWorkspaces = () => api.get('/usuarios_asignados/');
