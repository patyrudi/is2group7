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
        <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBoards.map((board) => (
                    <div
                        key={board.idTablero}
                        className="bg-blue-600 text-white font-bold p-4 rounded shadow hover:bg-blue-500"




                        onClick={() =>
                            navigate(`/Workspaces/${idEspacio}/Boards/${board.idTablero}`)
                        }
                    >
                        <h2 className="text-lg font-semibold">{board.nombreTablero}</h2>
                    </div>
                ))}
            </div>

            {/* Crear nuevo tablero */}
            {isCreating ? (
                <div className="mt-6 bg-transparent p-5 rounded shadow-md">
                    <input
                        type="text"
                        className="border border-gray-300 p-3 rounded w-full text-black mb-4 focus:outline-blue-500"
                        placeholder="Nombre del nuevo tablero"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                            onClick={handleCreateBoard}
                        >
                            Crear Tablero
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                            onClick={() => setIsCreating(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-6">
                    <button
                        className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500"


                        onClick={() => setIsCreating(true)}
                    >
                        + Crear Tablero
                    </button>
                </div>
            )}
        </div>
    );
}
