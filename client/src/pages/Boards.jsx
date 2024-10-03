import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams } from "react-router-dom";
import { getWorkspace, updateWorkspace } from "../api/workspaces.api";
import { useNavigate } from "react-router-dom";
import { InviteUserForm } from "../components/InviteUserForm";
import { toast } from "react-hot-toast";
import { BoardsList } from '../components/BoardsList'

export function Boards() {
  const params = useParams();
  const idEspacio = params.idEspacio;
  const [Workspaces, setWorkspaces] = useState([]);
  const [editMode, setEditMode] = useState(false); // Estado para el modo de edición
  const [workspaceName, setWorkspaceName] = useState(""); // Estado para el nombre del espacio
  const toastperso = {style: {borderRadius: '10px',background: '#333',color: '#fff',}}
  const navigate = useNavigate();
  const toastStyles = {
      container: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      buttonContainer: {
        marginLeft: '15px',
        display: 'flex',
        gap: '10px',
      },
      buttonYes: {
        color: '#fff',
        backgroundColor: 'red',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
      },
      buttonNo: {
        color: '#333',
        backgroundColor: 'lightgray',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
      },
    };
  
  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const res = await getWorkspace(idEspacio);
        setWorkspaces(Array.isArray(res.data) ? res.data : [res.data]);
        setWorkspaceName(res.data.nombreEspacio); // Inicializar el nombre del espacio
      } catch (error) {
        console.error("Error loading workspaces:", error);
      }
    }
    loadWorkspaces();
  }, [idEspacio]);

  const handleDisableWorkspace = async (idEspacio) => {
    toast((t) => (
      <span style={toastStyles.container}>
        ¿Estás seguro de deshabilitar el espacio de trabajo?
        <div style={toastStyles.buttonContainer}>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await updateWorkspace(idEspacio, { estadoEspacio: false });
                toast.success('Espacio deshabilitado', toastperso)

                navigate("/workspaces"); // Redireccionar a la página de Workspaces
              } catch (error) {
                console.error("Error disabling workspace:", error);
              }
            }}
            style={toastStyles.buttonYes}
          >
            Sí
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={toastStyles.buttonNo}
          >
            No
          </button>
        </div>
      </span>
    ), {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        padding: '15px',
      },
    });
  };
  

  const handleEditWorkspace = () => {
    setEditMode(true);
  };

  const handleSaveWorkspaceName = async (idEspacio) => {
    try {
      await updateWorkspace(idEspacio, { nombreEspacio: workspaceName });
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((workspace) =>
          workspace.idEspacio === idEspacio
            ? { ...workspace, nombreEspacio: workspaceName }
            : workspace
        )
      );
      setEditMode(false); // Salir del modo de edición
      toast.success('Espacio modificado',toastperso)
    } catch (error) {
      console.error("Error updating workspace name:", error);
      toast.error(`error al modificar ${error}`,toastperso)
    }
  };

  return (
<div>
  <NavBar />
  {Workspaces.map(workspace => (
    <div key={workspace.idEspacio} className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
      
      {/* Contenedor del título, botones y formulario de invitación */}
      <div className="flex justify-between items-center">
        {/* Si estamos en modo de edición, mostrar un input, de lo contrario, mostrar el título */}
        {editMode ? (
          <input 
            type="text" 
            value={workspaceName} 
            onChange={(e) => setWorkspaceName(e.target.value)} 
            className="text-2xl font-bold text-black px-2 py-1 rounded"
          />
        ) : (
          <h1 className="text-2xl font-bold text-white">Workspace {workspace.nombreEspacio}</h1>
        )}
        
        {/* Contenedor para botones y formulario */}
        <div className="flex items-center space-x-4">
          {editMode ? (
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => handleSaveWorkspaceName(workspace.idEspacio)}
            >
              Guardar
            </button>
          ) : (
            <>
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDisableWorkspace(workspace.idEspacio)}
              >
                Deshabilitar espacio
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleEditWorkspace}
              >
                Modificar espacio
              </button>
            </>
          )}

          {/* Componente para invitar usuarios */}
          <InviteUserForm idEspacio={workspace.idEspacio} />
        </div>
      </div>
      
    </div>
  ))}
  <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
    < BoardsList />
  </div>
</div>
  );
}
