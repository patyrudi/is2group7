import api from './axiosConfig';

export const getAllWorkspaces = () => api.get('/espacios/');

export const getWorkspace = (idEspacio) => api.get(`/espacios/${idEspacio}/`);

export const createWorkspace = (workspace) => api.post('/espacios/', workspace);

export const deleteWorkspace = (idEspacio) => api.delete(`/espacios/${idEspacio}/`);

export const updateWorkspace = (idEspacio, workspace) => api.patch(`/espacios/${idEspacio}/`, workspace);

export const getAllAssignedWorkspaces = () => api.get('/usuarios_asignados/');

export const createAssignedWorkspaces = (workspace) => api.post('/crearespacio/',workspace);

export const disableWorkspace = async (payload) => {
    console.log(  console.log('Payload enviado:', payload))
    try {
      const response = await api.post('/deshabilitar-espacio/', payload);

      return response.data;
    } catch (error) {
      console.error('Error en disableWorkspace:', error);
      throw error;
    }
  };