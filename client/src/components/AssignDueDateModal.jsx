import { useState } from "react";
import { updateCard } from "../api/tarjeta.api"; // Importa la función updateCard

export function AssignDueDateModal({ onClose, idTarjeta, onAssignDueDate }) {
  const [dueDate, setDueDate] = useState("");

  const handleSave = async () => {
    // Actualiza la tarjeta usando PATCH con la nueva fecha de vencimiento
    try {
      await updateCard(idTarjeta, { fechaVencimiento: dueDate });
      onAssignDueDate(dueDate); // Llama a la función para manejar la fecha en el componente principal
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error actualizando la fecha de vencimiento:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-300">
        <h3 className="text-xl text-gray-800 font-bold mb-4">Asignar Fecha de Vencimiento</h3>
        
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 mb-4 text-gray-800"
        />

        <div className="flex justify-end space-x-2">
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 border-b-2 border-blue-700 shadow-md">
            Guardar
          </button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md border-b-2 border-gray-700 shadow-md">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
