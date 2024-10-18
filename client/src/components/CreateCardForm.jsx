import { useState } from "react";
import { createCard } from "../api/tarjeta.api.js";

export function CreateCardForm({ onCancel, idLista, onCardCreated }) {
  const [nombreActividad, setNombreActividad] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaCreacion = getCurrentDate();

    const newCard = {
      nombreActividad,
      fechaCreacion,
      idLista,
    };

    try {
      await createCard(newCard);
      onCardCreated();
      onCancel();
    } catch (error) {
      console.error("Error creating card:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre de la actividad"
        value={nombreActividad}
        onChange={(e) => setNombreActividad(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
          Cancelar
        </button>
        <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
          Crear
        </button>
      </div>
    </form>
  );
}
