export function CardItem({ card, onClick }) {
    return (
      <div
        className="border-gray-700 bg-white p-2 rounded hover:bg-gray-300 cursor-pointer text-black border"
        onClick={onClick}
      >
        {/* Sección de etiquetas */}
        <div className="flex flex-wrap gap-1 mb-1">
          {card.etiquetas && card.etiquetas.length > 0 ? (
            card.etiquetas.map((etiqueta, index) => (
              <span
                key={index}
                className="text-xs font-semibold rounded px-2 py-1"
                style={{ backgroundColor: etiqueta.color, color: '#fff' }} // Asegúrate de que el texto sea legible
              >
                {etiqueta.nombreEtiqueta}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">Sin etiquetas</span> // Mensaje si no hay etiquetas
          )}
        </div>
  
        {/* Nombre de la actividad */}
        <h4 className="font-semibold">{card.nombreActividad}</h4>
      </div>
    );
  }
  