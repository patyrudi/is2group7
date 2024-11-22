import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { getAllAssignedWorkspaces, getWorkspace, createWorkspace, createAssignedWorkspaces} from "../api/workspaces.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const toastperso = {style: {borderRadius: '10px',background: '#333',color: '#fff',}}
  const navigate = useNavigate();

  // Obtener el idUsuario desde localStorage
  const userId = localStorage.getItem("idUsuario");
  console.log("User ID:", userId);

  const loadWorkspaces = async () => {
    try {
      const response = await getAllAssignedWorkspaces();
      const assignedWorkspaces = response.data;

      // Filtrar los espacios asignados para el idUsuario específico
      const filteredWorkspaces = assignedWorkspaces.filter(
        (assigned) => assigned.idUser === parseInt(userId)
      );

      const workspacesDetails = await Promise.all(
        filteredWorkspaces.map(async (assigned) => {
          const workspaceResponse = await getWorkspace(assigned.idEspacio);
          const workspace = workspaceResponse.data;

          // Filtrar por estadoEspacio
          if (workspace.estadoEspacio) {
            return workspace;
          }
          return null;
        })
      );

      // Eliminar valores nulos del array resultante
      const activeWorkspaces = workspacesDetails.filter(
        (workspace) => workspace !== null
      );

      setWorkspaces(activeWorkspaces);
    } catch (error) {
      console.error("Error al cargar los espacios", error);
      toast.error("Error al cargar los espacios");
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleCreateWorkspace = async (data) => {
    try {
      // Crear el nuevo espacio de trabajo
      const workspaceResponse = await createWorkspace({ nombreEspacio: data.nombreEspacio });
      console.log("Respuesta de la creación del espacio:", workspaceResponse.data);
  
      if (workspaceResponse.data && workspaceResponse.data.idEspacio) {
        const nuevoEspacioId = workspaceResponse.data.idEspacio;
  
        // Aquí asignamos al creador como 'Owner'
        const assignedWorkspaceData = {
          accion: 'crear',
          idUser: userId, // Asegúrate de que userId esté definido
          idEspacio: nuevoEspacioId, // Usa el ID del nuevo espacio
          tipoUsuario: "Owner",
          fechaAsignacion: new Date().toISOString().split("T")[0], // Fecha actual
        };
  
        // Enviar los datos para asignar al creador como 'Owner'
        const assignResponse = await createAssignedWorkspaces(assignedWorkspaceData);
  
        toast.success("Espacio creado exitosamente");
        reset();
        setIsCreating(false);
        loadWorkspaces();
      } else {
        toast.error("Error al crear el espacio de trabajo");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          toast.error("Espacio de trabajo no encontrado");
        } else if (status === 400) {
          toast.error("Error en los datos proporcionados");
        } else {
          toast.error("Ha ocurrido un error");
        }
      } else {
        toast.error("Error de red o problema desconocido");
      }
    }
  };
  
  const onSubmit = async (data) => {
    await handleCreateWorkspace(data);
  };
  
  

  return (
    <div>
      <NavBar />
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Workspaces</h2>
        <button
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                            onClick={() => navigate(`/MainMenu/`)}
                        >
                            Menu principal
                    </button>
        
      </div>
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <div
              key={workspace.idEspacio}
              className="bg-gray-800 p-12 rounded-lg text-center hover:bg-gray-700"
              onClick={() => {
                navigate(`/Workspaces/${workspace.idEspacio}/Boards/`);
              }}
            >
              {workspace.nombreEspacio}
            </div>
          ))}
          {/* Botón para crear nuevo espacio */}
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gray-800 p-4 rounded-lg text-center flex justify-center items-center hover:bg-gray-700"
            >
              <span className="text-3xl">+</span>
            </button>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-800 p-4 rounded-lg text-center"
            >
              <input
                type="text"
                placeholder="Nombre del Espacio"
                {...register("nombreEspacio", { required: true })}
                className="w-full p-2 mb-2 bg-white text-black"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
              >
                Crear Espacio
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
