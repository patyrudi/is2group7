import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllboards, createBoard } from "../api/tableros.api";

export function BoardsList() {
    const [boards, setBoards] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const navigate = useNavigate();
    const { idEspacio } = useParams();  // Obtener el idEspacio desde la URL

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

    // Filtrar tableros que coincidan con el idEspacio
    const filteredBoards = boards.filter(board => board.idEspacio === parseInt(idEspacio));

    // Función para crear un nuevo tablero
    async function handleCreateBoard() {
        if (!newBoardName) {
            alert("El nombre del tablero es obligatorio");
            return;
        }

        try {
            const newBoard = {
                nombreTablero: newBoardName,
                idEspacio: parseInt(idEspacio)  // Asegúrate de enviar el idEspacio correcto
            };
            await createBoard(newBoard);
            setNewBoardName("");  // Limpiar el campo de input
            setIsCreating(false);  // Salir del modo creación
            loadBoards();  // Recargar la lista de tableros
        } catch (error) {
            console.error("Error creating board:", error.message);
        }
    }

    return (
        <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBoards.map((board) => (
                    <div
                        key={board.idTablero}
                        className="bg-blue shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer"
                        onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/${board.idTablero}`)}
                    >
                        <h2 className="text-xl font-bold">{board.nombreTablero}</h2>
                    </div>
                ))}
            </div>

            {/* Crear nuevo tablero */}
            {isCreating ? (
                <div className="mt-5">
                    <input
                        type="text"
                        className="border p-2 rounded w-full text-black"
                        placeholder="Nombre del nuevo tablero"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            className="bg-green-500 text-white p-2 rounded mr-2"
                            onClick={handleCreateBoard}
                        >
                            Crear Tablero
                        </button>
                        <button
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={() => setIsCreating(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-5">
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => setIsCreating(true)}
                    >
                        + Crear Tablero
                    </button>
                </div>
            )}
        </div>
    );
}
