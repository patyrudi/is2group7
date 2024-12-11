import { toast } from "react-hot-toast";

export function CreateListForm({ onCreate }) {
  return (
<div>
  {/* Botón para cerrar el toast */}
  <button
    onClick={() => toast.dismiss()} // Cerrar el toast
    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
  >
   <button className="text-x2 font-bold">❌</button>
  </button>

  {/* Título */}
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Crear Nueva Lista</h2>

  {/* Nombre de la lista */}
  <div className="mb-4">
    <label htmlFor="nombreLista" className="block text-gray-700 font-medium mb-2">
      Nombre de la lista:
    </label>
    <input
      type="text"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-500"
      id="nombreLista"
      placeholder="Nombre de la lista"
    />
  </div>

  {/* Max WIP */}
  <div className="mb-4">
    <label htmlFor="maxWip" className="block text-gray-700 font-medium mb-2">
      Max WIP:
    </label>
    <input
      type="number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-500"
      id="maxWip"
      min="1"
      max="100"
      placeholder="1 a 100"
    />
  </div>

  {/* Estado */}
  <div className="mb-6">
    <label htmlFor="idEstado" className="block text-gray-700 font-medium mb-2">
      Estado:
    </label>
    <select
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-500"
      id="idEstado"
    >
      <option value={1}>Por hacer</option>
      <option value={2}>En proceso</option>
      <option value={3}>Finalizado</option>
    </select>
  </div>

  {/* Botón para crear lista */}
  <div className="mt-6 flex justify-end">
    <button
      className="bg-cyan-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-cyan-700 focus:ring-2 focus:border-purple-500 focus:outline-none transition duration-200"
      onClick={onCreate}
    >
      Crear Lista
    </button>
  </div>
</div>


  );
}
