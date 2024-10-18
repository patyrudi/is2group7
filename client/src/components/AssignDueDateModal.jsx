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
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-white">Asignar Fecha de Vencimiento</h3>
        
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 mb-4 text-black"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-indigo-700 text-white px-4 py-2 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
