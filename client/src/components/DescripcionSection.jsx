import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa"; 

export function DescripcionSection({ descripcionInicial, onGuardarDescripcion }) {
  const [descripcion, setDescripcion] = useState(descripcionInicial);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    setDescripcion(descripcionInicial);
  }, [descripcionInicial]);

  const guardarDescripcion = () => {
    onGuardarDescripcion(descripcion);
    setEditando(false); // Cambia al modo de solo lectura.
  };

  return (
<div>
  <h4 className="font-semibold mb-1">Descripción:</h4>
  {editando ? (
    // Modo edición
    <div>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border rounded p-4 w-full mb-3 bg-white text-gray-600 focus:ring focus:ring-blue-300"
        rows={4}
        aria-label="Editar descripción"
      />
      <button
        onClick={guardarDescripcion}
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        aria-label="Guardar descripción"
      >
        Guardar
      </button>
    </div>
  ) : (
    // Modo solo lectura
    <div className="flex items-center justify-between bg-gray-100 p-5 rounded shadow mb-4">
      <p className="text-gray-600">
        {descripcion ? descripcion : "No hay descripción"}
      </p>
      <button
        onClick={() => setEditando(true)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
        aria-label="Editar descripción"
      >
        <FaPencilAlt />
      </button>
    </div>
  )}
</div>


  );
}
