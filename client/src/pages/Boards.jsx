import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkspace, updateWorkspace } from "../api/workspaces.api";
import { InviteUserForm } from "../components/InviteUserForm";
import { BoardsList } from '../components/BoardsList';
import { toast } from "react-hot-toast";

export function Boards() {
  const { idEspacio } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

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
    async function loadWorkspace() {
      try {
        const { data } = await getWorkspace(idEspacio);
        setWorkspace(data);
        setWorkspaceName(data.nombreEspacio);
      } catch (error) {
        console.error("Error loading workspace:", error);
      }
    }
    loadWorkspace();
  }, [idEspacio]);

  const handleDisableWorkspace = async () => {
    toast((t) => (
      <span style={toastStyles.container}>
        ¿Estás seguro de deshabilitar el espacio de trabajo?
        <div style={toastStyles.buttonContainer}>
          <button
            style={toastStyles.buttonYes}
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await updateWorkspace(idEspacio, { estadoEspacio: false });
                toast.success('Espacio deshabilitado', { style: toastStyles.container });
                navigate("/workspaces");
              } catch (error) {
                console.error("Error disabling workspace:", error);
              }
            }}
          >
            Sí
          </button>
          <button
            style={toastStyles.buttonNo}
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const handleEditWorkspace = () => setEditMode(true);

  const handleSaveWorkspaceName = async () => {
    try {
      await updateWorkspace(idEspacio, { nombreEspacio: workspaceName });
      setWorkspace((prevWorkspace) => ({
        ...prevWorkspace,
        nombreEspacio: workspaceName,
      }));
      setEditMode(false);
      toast.success('Espacio modificado', { style: toastStyles.container });
    } catch (error) {
      console.error("Error updating workspace name:", error);
      toast.error(`Error al modificar: ${error.message}`, { style: toastStyles.container });
    }
  };

  if (!workspace) return <div>Cargando...</div>;

  return (
    <div>
      <NavBar />
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          {editMode ? (
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="text-2xl font-bold text-black px-2 py-1 rounded"
            />
          ) : (
            <h1 className="text-2xl font-bold text-white">
              Workspace: {workspace.nombreEspacio}
            </h1>
          )}

          <div className="flex items-center space-x-4">
            {editMode ? (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSaveWorkspaceName}
              >
                Guardar
              </button>
            ) : (
              <>
                <button
                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"


                  onClick={handleDisableWorkspace}
                >
                  Deshabilitar espacio
                </button>
                <button
                 className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"


                  onClick={handleEditWorkspace}
                >
                  Modificar espacio
                </button>
                <button
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"


                  onClick={() => navigate(`/workspaces`)}
                >
                  Volver
                </button>
              </>
            )}
            <InviteUserForm idEspacio={workspace.idEspacio} />
          </div>
        </div>
      </div>
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
        <BoardsList />
      </div>
    </div>
  );
}
