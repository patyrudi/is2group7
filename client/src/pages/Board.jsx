import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { getBoard, updateBoard, deleteBoard } from "../api/tableros.api"; 
import { ListAndCard } from "../components/ListAndCard";

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
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
        {!isEditing ? (
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Tablero: {boardName}</h1>
            <div className="flex items-center">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Editar nombre
              </button>

              <button
                onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/${idTablero}/Dashboard/`)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Dashboard
              </button>
              <button
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/`)}
              >
                  Volver
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Eliminar tablero
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
            <div>
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 ml-4"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 ml-4"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
        <ListAndCard />
      </div>
    </div>
  );
}
