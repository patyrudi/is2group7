import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { getBoard, updateBoard, deleteBoard } from "../api/tableros.api"; 
import { ListAndCard } from "../components/ListAndCard";
import { toast } from "react-hot-toast";

export function Board() {
  const [boardName, setBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const params = useParams();
  const idTablero = params.idTablero;
  const idEspacio = params.idEspacio;
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBoard(idTablero) {
      try {
        const response = await getBoard(idTablero);
        setBoardName(response.data.nombreTablero);
        setNewBoardName(response.data.nombreTablero);
      } catch (error) {
        console.error("Error al cargar el tablero:", error);
      }
    }

    if (idTablero) {
      loadBoard(idTablero);
    }
  }, [idTablero]);

  const handleUpdate = async () => {
    try {
      await updateBoard(idTablero, { nombreTablero: newBoardName });
      setBoardName(newBoardName);
      setIsEditing(false);
      toast.success('Nombre de Tablero actualizado');
    } catch (error) {
      console.error("Error al actualizar el tablero:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBoard(idTablero);
      navigate("/Workspaces");
    } catch (error) {
      console.error("Error al eliminar el tablero:", error);
    }
  };

  return (
<div>
  <NavBar />
  <div className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
    {!isEditing ? (
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tablero: {boardName}</h1>
        <div className="flex items-center space-x-4"> {/* Espaciado entre los botones */}
        <button
            onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/`)}  // Regresa a la página anterior
            className=" bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-2 px-5 rounded-lg shadow-md hover:scale-105 transition duration-300"
          >
            {/* Carácter Unicode para una flecha hacia la izquierda */}
            <span className="mr-2">←</span> Volver
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg hover:scale-105 transition duration-30"
          >
            Editar nombre
          </button>

          <button
            onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/${idTablero}/Dashboard/`)}
            className="bg-[#65439a] hover:bg-[#45317b] text-white py-2 px-4 rounded-lg ml-4 hover:scale-105 transition duration-300"
          >
            Dashboard
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ml-4 transform hover:scale-105 transition duration-300"
          >
            Eliminar tablero
          </button>
        </div>
      </div>
    ) : (
      <div className="flex justify-between items-center space-x-4">
  <input
    type="text"
    value={newBoardName}
    onChange={(e) => setNewBoardName(e.target.value)}
    className="bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
  />
  <div className="flex space-x-4">
    <button
      onClick={handleUpdate}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      Guardar cambios
    </button>
    <button
      onClick={() => setIsEditing(false)}
      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2"
    >
      Cancelar
    </button>
  </div>
</div>

    )}
  </div>
  <div className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
    <ListAndCard />
  </div>
</div>

  );
}
