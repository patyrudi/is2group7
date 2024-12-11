import { toast } from "react-hot-toast";

export function ListSettingsForm({ list, onUpdate, onDelete }) {
  return (
<div>
{/* Botón para cerrar el toast */}
<button
    onClick={() => toast.dismiss()} // Cerrar el toast
    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
  >
   <button className="text-x2 font-bold">❌</button>
  </button>

  <h2 className="text-xl font-semibold text-gray-700 mb-4">Configuración de la Lista</h2>

  <div className="flex justify-between w-full"></div>

  <div className="mb-3 w-full">
    <label className="block text-gray-700 font-semibold mb-2">
      Nombre de la lista:
    </label>
    <input
      type="text"
      defaultValue={list.nombreLista}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      id="maxWip"
      min="1"
      max="100"
    />
  </div>

  <div className="mb-3 w-full">
    <label className="block text-gray-700 font-semibold mb-2">Estado:</label>
    <select
      defaultValue={list.idEstado}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      id="idEstado"
    >
      <option value={1}>Por hacer</option>
      <option value={2}>En proceso</option>
      <option value={3}>Finalizado</option>
    </select>
  </div>

  <div className="mt-5 w-full flex justify-between space-x-4">
    <button
      className="bg-cyan-600 text-white px-4 py-2 rounded shadow-md hover:bg-cyan-700 hover:shadow-lg transition duration-200"
      onClick={() => onUpdate(list)}
    >
      Guardar Cambios
    </button>
    <button
      className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200"
      onClick={() => onDelete(list.idLista)}
    >
      Eliminar Lista
    </button>
  </div>
</div>


  );
}
