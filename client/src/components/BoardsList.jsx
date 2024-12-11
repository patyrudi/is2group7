import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllboards, createBoard } from "../api/tableros.api";

export function BoardsList() {
    const [boards, setBoards] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const navigate = useNavigate();
    const { idEspacio } = useParams(); // Obtener el idEspacio desde la URL

    useEffect(() => {
        loadBoards();
    }, []);

    async function loadBoards() {
        try {
            const res = await getAllboards();
            console.log("Boards fetched:", res.data);
            setBoards(res.data);
        } catch (error) {
            console.error("Error fetching boards:", error.message);
            console.log(error.response);
        }
    }

    const filteredBoards = boards.filter((board) => board.idEspacio === parseInt(idEspacio));

    async function handleCreateBoard() {
        if (!newBoardName) {
            alert("El nombre del tablero es obligatorio");
            return;
        }

        try {
            const newBoard = {
                nombreTablero: newBoardName,
                idEspacio: parseInt(idEspacio), // Asegúrate de enviar el idEspacio correcto
            };
            await createBoard(newBoard);
            setNewBoardName(""); // Limpiar el campo de input
            setIsCreating(false); // Salir del modo creación
            loadBoards(); // Recargar la lista de tableros
        } catch (error) {
            console.error("Error creating board:", error.message);
        }
    }

    return (
<div className="container mx-auto my-6 p-6 rounded-lg">
  {/* Contenedor de tableros */}
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

    {/* Mapeo de los tableros */}
    {filteredBoards.map((board) => (
      <div
        key={board.idTablero}
        className="bg-cyan-600 text-white font-bold p-4 rounded-md hover:bg-cyan-700 transition duration-200 cursor-pointer"
        onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/${board.idTablero}`)}
      >
        <h2 className="text-lg font-semibold text-center">{board.nombreTablero}</h2>
      </div>
    ))}

    {/* Botón para crear un nuevo tablero */}
    <div
      className="bg-[#7B60B0] flex justify-center items-center text-white text-3xl font-bold rounded-md hover:bg-[#65439A] transition duration-200 cursor-pointer"
      onClick={() => setIsCreating(true)}
    >
      +
    </div>
  </div>

  {/* Crear nuevo tablero */}
  {isCreating && (
    <div className="mt-5 p-4 rounded-md bg-[#F2E7FF] shadow-md">
      <input
        type="text"
        className="border bg-white p-3 rounded w-full text-black mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder="Nombre del nuevo tablero"
        value={newBoardName}
        onChange={(e) => setNewBoardName(e.target.value)}
      />
      <div className="flex justify-end gap-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          onClick={handleCreateBoard}
        >
          Crear Tablero
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
          onClick={() => setIsCreating(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  )}
</div>



    );
}
