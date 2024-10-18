// EtiquetasSection.jsx
import { useState } from "react";
import { Etiqueta } from "./Etiqueta";

export function EtiquetasSection({ etiquetasSeleccionadas, onAgregarEtiqueta, onEliminarEtiqueta }) {
  const [showEtiquetas, setShowEtiquetas] = useState(false);
  const [nuevoNombreEtiqueta, setNuevoNombreEtiqueta] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("#000000");

  const agregarEtiqueta = () => {
    if (nuevoNombreEtiqueta && colorSeleccionado) {
      onAgregarEtiqueta(nuevoNombreEtiqueta, colorSeleccionado);
      setNuevoNombreEtiqueta("");
      setColorSeleccionado("#000000");
      setShowEtiquetas(false);
    }
  };

  return (
    <div className="mb-2">
      <h4 className="font-semibold mb-1">Etiquetas:</h4>
      <div className="flex flex-wrap gap-2 mb-2">
        {etiquetasSeleccionadas.length > 0 ? (
          etiquetasSeleccionadas.map((etiqueta, index) => (
            <Etiqueta
              key={index}
              etiqueta={etiqueta}
              onEliminar={() => onEliminarEtiqueta(index)}
            />
          ))
        ) : (
          <p className="text-gray-400">Sin etiquetas</p>
        )}
        <div className="flex items-center mb-2">
          <span
            onClick={() => setShowEtiquetas((prev) => !prev)}
            className="border border-gray-600 rounded p-2 cursor-pointer flex items-center"
          >
            <span className="bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-1">+</span>
          </span>
        </div>
      </div>

      {showEtiquetas && (
        <div className="flex mb-2">
          <input
            type="text"
            value={nuevoNombreEtiqueta}
            onChange={(e) => setNuevoNombreEtiqueta(e.target.value)}
            placeholder="Nombre de la etiqueta"
            className="border rounded p-2 w-full mr-2 bg-gray-700 text-white"
          />
          <input
            type="color"
            value={colorSeleccionado}
            onChange={(e) => setColorSeleccionado(e.target.value)}
            className="w-12 h-12 border rounded mr-2 cursor-pointer"
          />
          <button
            onClick={agregarEtiqueta}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
}
