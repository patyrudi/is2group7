import { toast } from "react-hot-toast";

export function CreateListForm({ onCreate }) {
  return (
    <div>
      <button
        onClick={() => toast.dismiss()} // Cerrar el toast
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        ✖️
      </button>

      <h2 className="text-xl font-bold mb-4">Crear Nueva Lista</h2>

      <div className="mb-3 w-full">
        <label className="block text-gray-700 font-semibold mb-2">Nombre de la lista:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          id="nombreLista"
          placeholder="Nombre de la lista"
        />
      </div>

      <div className="mb-3 w-full">
        <label className="block text-gray-700 font-semibold mb-2">Max WIP:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          id="maxWip"
          min="1"
          max="100"
          placeholder="1 a 100"
        />
      </div>

      <div className="mb-3 w-full">
        <label className="block text-gray-700 font-semibold mb-2">Estado:</label>
        <select className="w-full p-2 border rounded" id="idEstado">
          <option value={1}>Por hacer</option>
          <option value={2}>En proceso</option>
          <option value={3}>Finalizado</option>
        </select>
      </div>

      <div className="mt-4 w-full flex justify-between">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm"
          onClick={onCreate}
        >
          Crear Lista
        </button>
      </div>
    </div>
  );
}
