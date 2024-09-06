import { useState } from "react";
import { createAssignedWorkspaces } from "../api/workspaces.api";
import { getUserIdByUsername } from "../api/usuarios.api";

export function InviteUserForm({ idEspacio }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleInviteUser = async () => {
    try {
      const res = await getUserIdByUsername(username);
      console.log(res);

      if (res.data && res.data.idUsuario) {
        const idUsuario = res.data.idUsuario;
      
        const assignedWorkspaceData = {
          idUser: idUsuario,
          idEspacio: idEspacio,
          tipoUsuario: "Invitado",
          fechaAsignacion: new Date().toISOString().split("T")[0],
        };

        await createAssignedWorkspaces(assignedWorkspaceData);
        alert("Usuario invitado exitosamente");
      } else {
        throw new Error("La respuesta no contiene el idUsuario");
      }
    } catch (error) {
      console.error("Error invitando al usuario:", error.response?.data || error.message);
      setError("No se pudo invitar al usuario");
    }
  };

  return (
    <div>
      <h2>Invitar Usuario</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
        className="text-blue-400"
      />
      <button onClick={handleInviteUser} className="bg-blue-400 text-white">Invitar</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
