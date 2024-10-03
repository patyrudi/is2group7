import { toast } from "react-hot-toast";

export function ListSettingsForm({ list, onUpdate, onDelete }) {
  return (
    <div>
      <button
        onClick={() => toast.dismiss()} // Cerrar el toast
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        ✖️
      </button>

      <div className="flex justify-between w-full mb-4">
        <h2 className="text-xl font-bold">Configuración de la Lista</h2>
      </div>

      <div className="mb-3 w-full">
        <label className="block text-gray-700 font-semibold mb-2">
          Nombre de la lista:
        </label>
        <input
          type="text"
          defaultValue={list.nombreLista}
          className="w-full p-2 border rounded"
          id="nombreLista"
        />
      </div>

      <div className="mb-3 w-full">
        <label className="block text-gray-700 font-semibold mb-2">
          Max WIP (Límite de trabajo):
        </label>
        <input
          type="number"
          defaultValue={list.maxWip}
          className="w-full p-2 border rounded"
          id="maxWip"
          min="1"
          max="100"
        />
      </div>

      <div className="mb-3 w-full">
        <label className="block text-gray-700 font-semibold mb-2">Estado:</label>
        <select defaultValue={list.idEstado} className="w-full p-2 border rounded" id="idEstado">
          <option value={1}>Por hacer</option>
          <option value={2}>En proceso</option>
          <option value={3}>Finalizado</option>
        </select>
      </div>

      <div className="mt-4 w-full flex justify-between">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm"
          onClick={() => onUpdate(list)}
        >
          Guardar Cambios
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
          onClick={() => onDelete(list.idLista)}
        >
          Eliminar Lista
        </button>
      </div>
    </div>
  );
}
