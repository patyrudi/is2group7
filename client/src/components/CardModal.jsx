import { useEffect, useState } from "react";
import { getList } from "../api/lista.api.js";
import { getUser } from "../api/usuarios.api.js";
import { updateCard } from "../api/tarjeta.api.js";
import cerrarSvg from "../images/cerrar.svg"; 
import { EtiquetasSection } from "./EtiquetasSection";
import { DescripcionSection } from "./DescripcionSection";
import { AssignUserModal } from "./AssignUserModal.jsx";
import { AssignDueDateModal } from "./AssignDueDateModal.jsx";
import { MoveCardModal } from "./MoveCardModal.jsx"; 
import { getCard } from "../api/tarjeta.api.js";

export function CardModal({ card, onClose, onUpdateCard }) {
  const [cardData, setCardData] = useState({
    idTarjeta: "",
    nombreActividad: "",
    descripcionTarjeta: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    etiquetas: [],
    idLista: "",
    idUsuarioAsignado: "",
  });
  const [nombreLista, setNombreLista] = useState("");
  const [usuarioAsignado, setUsuarioAsignado] = useState("Sin usuario asignado");
  const [loading, setLoading] = useState(false);
  const [showAssignUserModal, setShowAssignUserModal] = useState(false);
  const [showAssignDueDateModal, setShowAssignDueDateModal] = useState(false);
  const [showMoveCardModal, setShowMoveCardModal] = useState(false); 

  useEffect(() => {
    const fetchCardData = async () => {
      if (card && card.idTarjeta) {
        try {
          const res = await getCard(card.idTarjeta);
          setCardData(res.data);
        } catch (error) {
          console.error("Error fetching card data:", error.message);
        }
      }
    };
  
    fetchCardData();
  }, [card]);

  useEffect(() => {
    // Llama a las funciones para obtener los datos
    fetchListName();
    fetchUserName();
  }, [cardData.idLista, cardData.idUsuarioAsignado]);

  const fetchListName = async () => {
    try {
      const res = await getList(cardData.idLista);
      setNombreLista(res.data.nombreLista);
    } catch (error) {
      console.error("Error fetching list name:", error.message);
    }
  };

  const fetchUserName = async () => {
    if (cardData.idUsuarioAsignado) {
      try {
        setLoading(true);
        const res = await getUser(cardData.idUsuarioAsignado);
        setUsuarioAsignado(res.data.username);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setUsuarioAsignado("Usuario no encontrado");
      } finally {
        setLoading(false);
      }
    } else {
      setUsuarioAsignado("Sin usuario asignado");
    }
  };

  const handleChange = (field, value) => {
    setCardData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const guardarDescripcion = async (nuevaDescripcion) => {
    try {
      const updatedCard = { ...cardData, descripcionTarjeta: nuevaDescripcion };
      await updateCard(cardData.idTarjeta, updatedCard);
      setCardData(updatedCard);
      onUpdateCard(updatedCard);
    } catch (error) {
      console.error("Error actualizando descripción:", error.message);
    }
  };
  
  const agregarEtiqueta = async (nombreEtiqueta, color) => {
    const updatedEtiquetas = [...cardData.etiquetas, { nombreEtiqueta, color }];
    handleChange("etiquetas", updatedEtiquetas);

    try {
      await updateCard(cardData.idTarjeta, { ...cardData, etiquetas: updatedEtiquetas });
      onUpdateCard({ ...cardData, etiquetas: updatedEtiquetas });
    } catch (error) {
      console.error("Error agregando etiqueta:", error.message);
    }
  };

  const eliminarEtiqueta = async (index) => {
    const updatedEtiquetas = cardData.etiquetas.filter((_, i) => i !== index);
    handleChange("etiquetas", updatedEtiquetas);

    try {
      await updateCard(cardData.idTarjeta, { ...cardData, etiquetas: updatedEtiquetas });
      onUpdateCard({ ...cardData, etiquetas: updatedEtiquetas });
    } catch (error) {
      console.error("Error eliminando etiqueta:", error.message);
    }
  };

  const handleAssignUser = async (userId) => {
    handleChange("idUsuarioAsignado", userId);
    try {
      setLoading(true);
      await updateCard(cardData.idTarjeta, { ...cardData, idUsuarioAsignado: userId });
      const res = await getUser(userId);
      setUsuarioAsignado(res.data.username);
      onUpdateCard({ ...cardData, idUsuarioAsignado: userId });
    } catch (error) {
      console.error("Error asignando usuario:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignDueDate = async (newDueDate) => {
    handleChange("fechaVencimiento", newDueDate);
    try {
      await updateCard(cardData.idTarjeta, { ...cardData, fechaVencimiento: newDueDate });
      onUpdateCard({ ...cardData, fechaVencimiento: newDueDate });
    } catch (error) {
      console.error("Error asignando fecha de vencimiento:", error.message);
    }
  };

  const [isMoving, setIsMoving] = useState(false);

  const handleMoveCard = async (newListId) => {
    if (isMoving) return; // Evitar múltiples ejecuciones
    setIsMoving(true); // Marcar como en proceso
  
    const { idTarjeta, ...newCardData } = cardData;
    const updatedCard = { ...newCardData, idLista: newListId };
  
    try {
      await updateCard(idTarjeta, updatedCard);
      onUpdateCard({ ...cardData, idLista: newListId });
    } catch (error) {
      console.error("Error moviendo la tarjeta:", error.message);
    } finally {
      setIsMoving(false); // Restablecer el estado
    }
  };
  
  

  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-white">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-xl relative flex">
        <div className="flex-1">
          <span
            onClick={onClose}
            className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-200"
            role="button"
            aria-label="Cerrar"
          >
            <img src={cerrarSvg} alt="Cerrar" className="w-4 h-4" />
          </span>
          <h3 className="text-xl font-bold mb-2">{cardData.nombreActividad || "Nombre de actividad no disponible"}</h3>

          <p className="mb-2">En la lista: {nombreLista || "Nombre de lista no disponible"}</p>

          <EtiquetasSection
            etiquetasSeleccionadas={cardData.etiquetas || []}
            onAgregarEtiqueta={agregarEtiqueta}
            onEliminarEtiqueta={eliminarEtiqueta}
          />

          <DescripcionSection
            descripcionInicial={cardData.descripcionTarjeta || ""}
            onGuardarDescripcion={guardarDescripcion}
          />

          <h4 className="font-semibold mb-1">Usuario asignado:</h4>
          <p>{loading ? "Cargando..." : usuarioAsignado || "Sin usuario asignado"}</p>
          <h4 className="font-semibold mb-1">Fecha de creación:</h4>
          <p>{cardData.fechaCreacion || "Fecha de creación no disponible"}</p>
          <h4 className="font-semibold mb-1">Fecha de vencimiento:</h4>
          <p>{cardData.fechaVencimiento || "Sin fecha de vencimiento"}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <br />
          <button
            onClick={() => setShowAssignUserModal(true)}
            className="bg-indigo-700 text-white rounded px-3 py-1 text-sm"
          >
            Asignar usuario
          </button>
          <button
            onClick={() => setShowAssignDueDateModal(true)}
            className="bg-indigo-700 text-white rounded px-3 py-1 text-sm"
          >
            Asignar fecha de vencimiento
          </button>
          <button
            onClick={() => setShowMoveCardModal(true)}
            className="bg-indigo-700 text-white rounded px-3 py-1 text-sm"
          >
            Mover tarjeta
          </button>
        </div>
      </div>

      {showAssignUserModal && (
        <AssignUserModal
          idTarjeta={cardData.idTarjeta}
          onClose={() => setShowAssignUserModal(false)}
          onAssignUser={handleAssignUser}
        />
      )}

      {showAssignDueDateModal && (
        <AssignDueDateModal
          idTarjeta={cardData.idTarjeta}
          onClose={() => setShowAssignDueDateModal(false)}
          onAssignDueDate={handleAssignDueDate}
        />
      )}

      {showMoveCardModal && (
        <MoveCardModal
          cardData={cardData}
          onClose={() => setShowMoveCardModal(false)}
          onMoveCard={handleMoveCard}
        />
      )}
    </div>
  );
}