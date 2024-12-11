import { useState, useEffect } from "react";
import { createAssignedWorkspaces } from "../api/workspaces.api";
import { getUserIdByUsername, getAllUsers } from "../api/usuarios.api"; 
import { toast } from "react-hot-toast";

export function InviteUserForm({ idEspacio }) {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const toastperso = { style: { borderRadius: '10px', background: '#fff', color: '#000' } };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        toast.error("Error al cargar la lista de usuarios", toastperso);
      }
    };

    fetchUsers();
  }, []);

  const handleInviteUser = async () => {
    try {
      const res = await getUserIdByUsername(selectedUsername);

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
        toast.success("Usuario añadido al espacio de trabajo", toastperso);
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
        console.error(error);
        toast.error("Error de red o problema desconocido", toastperso);
      }
    }
  };

  return (
    <div className="relative flex justify-end items-center p-4">
      <select
        value={selectedUsername}
        onChange={(e) => setSelectedUsername(e.target.value)}
        className="border-b border-blue-400 focus:outline-none focus:border-blue-500 text-blue-600 placeholder-gray-400 mr-2 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"

      >
        <option value="" disabled>
          Elegir Usuario
        </option>
        {users.map((user) => (
          <option key={user.idUsuario} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button
        onClick={handleInviteUser}
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg hover:scale-105 transition duration-300"
      >
        Invitar
      </button>
    </div>
  );
}
