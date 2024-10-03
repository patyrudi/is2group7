import { useState } from "react";
import { createAssignedWorkspaces } from "../api/workspaces.api";
import { getUserIdByUsername } from "../api/usuarios.api";
import { toast } from "react-hot-toast";

export function InviteUserForm({ idEspacio }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const toastperso = {style: {borderRadius: '10px',background: '#333',color: '#fff',}}

  const handleInviteUser = async () => {
    try {
      const res = await getUserIdByUsername(username);
  
      if (res.data && res.data.idUsuario) {
        const idUsuario = res.data.idUsuario;
      
        const assignedWorkspaceData = {
          accion: 'invitar',
          idUser: idUsuario,
          idEspacio: idEspacio,
          tipoUsuario: "Invitado",
          fechaAsignacion: new Date().toISOString().split("T")[0],
        };
  
  
        const response = await createAssignedWorkspaces(assignedWorkspaceData);
        toast.success("Usuario añadido al espacio de trabajo",toastperso);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        
        if (status === 404) {
          toast.error("El usuario no existe", toastperso);
        } else if (status === 400) {
          toast.error("El usuario ya está asignado a este espacio de trabajo", toastperso);
        } else {
          toast.error("Ha ocurrido un error", toastperso);
        }
      } else {
        console.log(error);
        toast.error("Error de red o problema desconocido", toastperso);
      }
    }
    
  };
  

  return (
<div className="relative flex justify-end items-center p-4">
  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Nombre de usuario"
    className="border-b border-blue-400 focus:outline-none focus:border-blue-600 text-blue-600 placeholder-blue-400 mr-2 px-4 py-2 rounded"
  />
  <button
  onClick={handleInviteUser}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
>
  Invitar
</button>
  {error && (
    <p className="ml-2 text-red-500">{error}</p>
  )}
</div>


  );
}
