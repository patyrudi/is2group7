import { useState, useEffect } from "react";

export function DescripcionSection({ descripcionInicial, onGuardarDescripcion }) {
  const [descripcion, setDescripcion] = useState(descripcionInicial);

  useEffect(() => {
    setDescripcion(descripcionInicial);
  }, [descripcionInicial]);

  const guardarDescripcion = () => {
    onGuardarDescripcion(descripcion);
  };

  return (
    <div>
      <h4 className="font-semibold mb-1">Descripción:</h4>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border rounded p-2 w-full mb-2 bg-gray-700 text-white"
        rows="4"
      />
      <button
        onClick={guardarDescripcion}
        className="bg-blue-600 text-white rounded px-4 py-2 mb-2"
      >
        Guardar
      </button>
    </div>
  );
}
