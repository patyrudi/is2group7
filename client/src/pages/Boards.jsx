import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkspace, updateWorkspace, disableWorkspace } from "../api/workspaces.api";
import { InviteUserForm } from "../components/InviteUserForm";
import { BoardsList } from '../components/BoardsList';
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa"; // Importar ícono de React Icons.

export function Boards() {
  const params = useParams();
  const idEspacio = params.idEspacio;
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const idUser = localStorage.getItem('idUsuario');
  console.log(idUser);

  const toastStyles = {
    container: {
      borderRadius: 'none',
      background:  '#ffffff',  // Lila suave
      color: '#4B4B4B',        // Gris oscuro para el texto
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease', // Transición suave en el contenedor
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
    },
    buttonYes: {
      color: '#FFFFFF',
      backgroundColor: '#9C4DFF', // Lila intenso
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease, transform 0.3s ease', // Transiciones suaves
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra ligera para dar profundidad
    },
    buttonYesHover: {
      backgroundColor: '#7A3CBB', // Lila más oscuro cuando se pasa el cursor
      transform: 'scale(1.05)',  // Le da un pequeño efecto de aumento
    },
    buttonNo: {
      color: '#4B4B4B',
      backgroundColor: '#D1C4E9', // Lila suave
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease, transform 0.3s ease', // Transiciones suaves
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra suave
    },
    buttonNoHover: {
      backgroundColor: '#B39DDB', // Lila ligeramente más oscuro para el hover
      transform: 'scale(1.05)',  // Efecto de aumento para el hover
    },
    buttonFocus: {
      outline: 'none',  // Quitar el contorno por defecto
      boxShadow: '0 0 0 3px rgba(156, 77, 255, 0.5)',  // Añadir un contorno de enfoque suave en el botón
    }
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
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const idUsuario = localStorage.getItem('idUsuario'); 
                const idEspacio = params.idEspacio;
                
                if (!idUsuario) {
                  console.error('idUsuario no encontrado en localStorage');
                  return;
                }
  
                // Asegurarse de que los valores sean primitivos (string o number)
                const payload = {
                  idUser: idUsuario, 
                  idEspacio: idEspacio
                };
  
                console.log('idUsuario:', idUsuario);
                console.log('idEspacio:', idEspacio);
  
                await disableWorkspace(payload);
                toast.success('Espacio deshabilitado');
                navigate("/workspaces"); // Redireccionar a la página de Workspaces
              } catch (error) {
                console.error("Error disabling workspace:", error);
                toast.error('No eres owner, no puedes deshabilitar este espacio');
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
        background: '#FFFFFF',
        color: '#fff',
        padding: '15px',
      },
    });
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
  <div className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
    <div className="flex justify-between items-center">
      {editMode ? (
        <input
          type="text"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className="text-2xl  text-black px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      ) : (
        <h1 className="text-2xl font-bold text-gray-600">
          Workspace: {workspace.nombreEspacio}
        </h1>
      )}

<div className="flex items-center space-x-4">
  {editMode ? (
    <>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
        onClick={handleSaveWorkspaceName}
      >
        Guardar
      </button>
      <button
        className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 hover:shadow-lg hover:scale-105 transition duration-300"
        onClick={() => {
          setWorkspaceName(workspace.nombreEspacio); // Restaurar el nombre original
          setEditMode(false); // Salir del modo de edición
        }}
      >
        Cancelar
      </button>
    </>
        ) : (
          <>
           <button
            onClick={() => navigate(`/Workspaces/`)}  // Regresa a la página anterior
            className=" bg-[#3b82f6] hover:bg-[#2563eb] text-white py-2 px-5 rounded-lg shadow-md hover:scale-105 transition duration-300"
          >
            {/* Carácter Unicode para una flecha hacia la izquierda */}
            <span className="mr-2">←</span> Volver
          </button>
          <button
              className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg hover:scale-105 transition duration-300"
              onClick={handleEditWorkspace}
            >
              Modificar
            </button>

            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg hover:scale-105 transition duration-300"
              onClick={handleDisableWorkspace}
            >
              Deshabilitar
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