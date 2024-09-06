import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams } from "react-router-dom";
import { getWorkspace, updateWorkspace, createAssignedWorkspaces } from "../api/workspaces.api";
import { useNavigate } from "react-router-dom";
import { InviteUserForm } from "../components/InviteUserForm";

export function Boards() {
  const params = useParams();
  const idEspacio = params.idEspacio;
  const [Workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const res = await getWorkspace(idEspacio);
        setWorkspaces(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (error) {
        console.error("Error loading workspaces:", error);
      }
    }
    loadWorkspaces();
  }, [idEspacio]);

  return (
    <div>
      <NavBar />
      {Workspaces.map(workspace => (
        <div key={workspace.idEspacio} className="container p-9 display-block-center">
          <h1>Workspace {workspace.nombreEspacio}</h1>
          <button className="bg-red-800 text-blue-400 m-1">Deshabilitar espacio</button>
          <button className="bg-red-800 text-blue-400 m-1">Modificar espacio</button>
          
          {/* Componente para invitar usuarios */}
          <InviteUserForm idEspacio={workspace.idEspacio} />
          
        </div>
      ))}
    </div>
  );
}
