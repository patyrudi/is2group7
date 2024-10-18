// Etiqueta.jsx
import cerrarSvg from "../images/cerrar.svg";

export function Etiqueta({ etiqueta, onEliminar }) {
  return (
    <span
      className="flex items-center text-xs font-semibold rounded px-2 py-1 text-white"
      style={{ backgroundColor: etiqueta.color }}
    >
      {etiqueta.nombreEtiqueta}
      <img
        src={cerrarSvg}
        alt="Eliminar"
        className="w-3 h-3 cursor-pointer ml-1"
        onClick={onEliminar}
      />
    </span>
  );
}
