import { useEffect, useState } from "react";
import { getAllLists } from "../api/lista.api.js"; 
import { updateCard } from "../api/tarjeta.api.js"; 

export function MoveCardModal({ cardData, onClose, onMoveCard }) {
  const [listas, setListas] = useState([]); // Estado para las listas
  const [selectedListId, setSelectedListId] = useState(""); // Estado para la lista seleccionada

  // Función para obtener todas las listas al cargar el componente
  useEffect(() => {
    const fetchListas = async () => {
      try {
        const res = await getAllLists(); // Llamada a la API para obtener listas
        setListas(res.data); // Actualiza el estado con las listas obtenidas
      } catch (error) {
        console.error("Error fetching lists:", error.message); // Manejo de errores
      }
    };

    fetchListas(); // Llama a la función para obtener listas
  }, []);

  // Función para manejar el movimiento de la tarjeta
  const handleMove = async () => {
    if (selectedListId) {
      const updatedCardData = {
        ...cardData,
        idLista: parseInt(selectedListId, 10), // Convierte el ID de la lista a un entero
      };
  
      console.log("Moving card:", updatedCardData); // Muestra los datos de la tarjeta que se moverá
  
      try {
        await updateCard(cardData.idTarjeta, updatedCardData); // Actualiza la tarjeta en la nueva lista
        onMoveCard(cardData.idTarjeta, updatedCardData.idLista); // Notifica que la tarjeta fue movida
        handleClose(); // Cierra el modal después de mover la tarjeta
      } catch (error) {
        console.error("Error updating card:", error.message); // Manejo de errores
      }
    } else {
      console.error("No list selected"); // Mensaje si no se ha seleccionado una lista
    }
  };
  

  // Función para cerrar el modal y restablecer el estado
  const handleClose = () => {
    setSelectedListId(""); // Restablecer el ID seleccionado
    onClose(); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-white">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative">
        <h3 className="text-xl font-bold mb-4">Mover tarjeta</h3>

        <label htmlFor="lista" className="block mb-2">
          Selecciona una lista:
        </label>
        <select
            id="lista"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)} // Actualiza el estado con la lista seleccionada
            className="border rounded p-2 w-full mb-4 bg-gray-700 text-white"
            >
            <option value="" disabled>
                Elige una lista
            </option>
            {listas.map((lista) => (
                <option key={lista.idLista} value={lista.idLista}>
                {`${lista.idLista} - ${lista.nombreLista}`}
                </option>
            ))}
        </select>


        <div className="flex justify-end">
          <button
            onClick={handleMove} // Llama a la función para mover la tarjeta
            className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
          >
            Mover
          </button>
          <button
            onClick={handleClose} // Cierra el modal
            className="bg-gray-600 text-white rounded px-4 py-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
