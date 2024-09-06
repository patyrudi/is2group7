import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { getAllAssignedWorkspaces, getWorkspace, createWorkspace } from "../api/workspaces.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  
  // Obtener el idUsuario desde localStorage
  const userId = localStorage.getItem('idUsuario');


  const loadWorkspaces = async () => {
    try {
      const response = await getAllAssignedWorkspaces();
      const assignedWorkspaces = response.data;

      // Filtrar los espacios asignados para el idUsuario específico
      const filteredWorkspaces = assignedWorkspaces.filter(assigned => assigned.idUser === parseInt(userId));

      const workspacesDetails = await Promise.all(
        filteredWorkspaces.map(async (assigned) => {
          const workspaceResponse = await getWorkspace(assigned.idEspacio);
          return workspaceResponse.data;
        })
      );

      setWorkspaces(workspacesDetails);
    } catch (error) {
      console.error("Error al cargar los espacios", error);
      toast.error("Error al cargar los espacios");
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createWorkspace({ nombreEspacio: data.nombreEspacio });
      toast.success("Espacio creado exitosamente");
      reset();
      setIsCreating(false);
      loadWorkspaces();
    } catch (error) {
      console.error("Error al crear el espacio", error);
      toast.error("Error al crear el espacio");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Workspaces</h2>
        <div className="grid grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <div
              key={workspace.idEspacio}
              className="bg-gray-800 p-10 rounded-lg text-center"
            >
              {workspace.nombreEspacio}
            </div>
          ))}
          {/* Botón para crear nuevo espacio */}
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gray-800 p-4 rounded-lg text-center flex justify-center items-center"
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
                className="w-full p-2 mb-2 bg-gray-700 text-white"
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
