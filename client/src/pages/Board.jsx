import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { ListList } from "../components/ListList";
import { getBoard, updateBoard, deleteBoard } from "../api/tableros.api"; // Asegúrate de que estas funciones existan en tu API

export function Board() {
  const [boardName, setBoardName] = useState(""); // Nombre del tablero
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar edición
  const [newBoardName, setNewBoardName] = useState(""); // Para manejar el input del nombre editado
  const params = useParams();
  const idTablero = params.idTablero;
  const navigate = useNavigate(); // Para redirigir después de eliminar el tablero

  useEffect(() => {
    async function loadBoard(idTablero) {
      try {
        const response = await getBoard(idTablero); // Llama a la API para obtener el tablero
        setBoardName(response.data.nombreTablero); // Actualiza el estado con el nombre del tablero
        setNewBoardName(response.data.nombreTablero); // Inicializa el input con el nombre actual
      } catch (error) {
        console.error("Error al cargar el tablero:", error);
      }
    }

    if (idTablero) {
      loadBoard(idTablero);
    }
  }, [idTablero]);

  // Función para manejar la actualización del nombre del tablero
  const handleUpdate = async () => {
    try {
      await updateBoard(idTablero, { nombreTablero: newBoardName });
      setBoardName(newBoardName); // Actualiza el nombre mostrado
      setIsEditing(false); // Termina la edición
    } catch (error) {
      console.error("Error al actualizar el tablero:", error);
    }
  };

  // Función para eliminar el tablero
  const handleDelete = async () => {
    try {
      await deleteBoard(idTablero); // Llama a la API para eliminar el tablero
      navigate("/Workspaces"); // Redirige a la página de Workspaces después de eliminar
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
            <h1 className="text-2xl font-bold text-white">
              Tablero: {boardName}
            </h1>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar nombre
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
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
      <ListList />
      </div>
    </div>
  );
}
