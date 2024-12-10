import { useEffect, useState } from "react";
import { getList } from "../api/lista.api.js";
import { getUser } from "../api/usuarios.api.js";
import { updateCard, deleteCard, getCard } from "../api/tarjeta.api.js";
import cerrarSvg from "../images/cerrar.svg";
import { EtiquetasSection } from "./EtiquetasSection";
import { DescripcionSection } from "./DescripcionSection";
import { AssignUserModal } from "./AssignUserModal.jsx";
import { AssignDueDateModal } from "./AssignDueDateModal.jsx";
import { MoveCardModal } from "./MoveCardModal.jsx";
import { toast } from "react-hot-toast";

export function CardModal({ card, onClose, onUpdateCard }) {
const [nombreLista, setNombreLista] = useState("Nombre de lista no disponible");
const [usuarioAsignado, setUsuarioAsignado] = useState("Sin usuario asignado");
const [loading, setLoading] = useState(false);
const [showAssignUserModal, setShowAssignUserModal] = useState(false);
const [showAssignDueDateModal, setShowAssignDueDateModal] = useState(false);
const [showMoveCardModal, setShowMoveCardModal] = useState(false);
const [fechaVencimiento, setFechaVencimiento] = useState(card.fechaVencimiento || 'Sin fecha de vencimiento');
const [cardData, setCardData] = useState({
  idTarjeta: card.idTarjeta || "",
  nombreActividad: card.nombreActividad || "",
  descripcionTarjeta: card.descripcionTarjeta || "",
  fechaCreacion: card.fechaCreacion || "",
  fechaVencimiento: card.fechaVencimiento || "",
  etiquetas: card.etiquetas || [],
  idLista: card.idLista || "",
  idUsuarioAsignado: card.idUsuarioAsignado || "",
});  
const toastperso = {style: {borderRadius: '10px',background: '#333',color: '#fff',}};

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
  fetchListName(); 
}, [cardData.idLista]);

useEffect(() => {
  fetchUserName();
}, [cardData.idUsuarioAsignado]);

const fetchListName = async () => {
  try {
    const res = await getList(cardData.idLista); // Cambiar a cardData para usar el estado actualizado
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

const handleConfirmDeleteCard = async () => {
  // Mostrar el modal de confirmación
  const confirmation = await showConfirmationModal();
  if (confirmation) {
    try {
      // Usamos card.idTarjeta directamente desde el scope
      await deleteCard(card.idTarjeta); // Eliminar la tarjeta
      toast.success("Tarjeta eliminada correctamente.", toastperso); // Mensaje de éxito
      onClose(); // Cerrar o realizar alguna acción adicional
    } catch (error) {
      console.error("Error eliminando tarjeta:", error.message); // Log del error
      toast.error("Error al eliminar la tarjeta."); // Mensaje de error
    }
  }
};

// Función para mostrar el modal de confirmación
const showConfirmationModal = () => {
  return new Promise((resolve) => {
    // Crear el modal dinámicamente
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50";

    modal.innerHTML = `
      <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-lg font-bold mb-4">Confirmar eliminación</h2>
        <p class="text-gray-200 mb-6">¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no se puede deshacer.</p>
        <div class="flex justify-end space-x-4">
          <button id="cancelButton" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cancelar
          </button>
          <button id="confirmButton" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
            Eliminar
          </button>
        </div>
      </div>

    `;

    // Agregar el modal al DOM
    document.body.appendChild(modal);

    // Escuchar eventos de botones
    const cancelButton = document.getElementById("cancelButton");
    const confirmButton = document.getElementById("confirmButton");

    // Acción de cancelar
    cancelButton.addEventListener("click", () => {
      document.body.removeChild(modal);
      resolve(false); // El usuario cancela
    });

    // Acción de confirmar
    confirmButton.addEventListener("click", () => {
      document.body.removeChild(modal);
      resolve(true); // El usuario confirma
    });
  });
};

const guardarDescripcion = async (nuevaDescripcion) => {
  try {
    handleChange("descripcionTarjeta", nuevaDescripcion);
    const updatedCard = { ...cardData, descripcionTarjeta: nuevaDescripcion }; // Guarda en cardData
    await updateCard(cardData.idTarjeta, updatedCard);
    toast.success("Descripción actualizada correctamente.", toastperso);
    setCardData(updatedCard); // Actualiza cardData
    onUpdateCard(updatedCard);
  } catch (error) {
    console.error("Error actualizando descripción:", error.message);
  }
};

const handleChange = (field, value) => {
  setCardData(prevState => ({
    ...prevState,
    [field]: value,
  }));
};

const agregarEtiqueta = async (nombreEtiqueta, color) => {
  const updatedEtiquetas = [...cardData.etiquetas, { nombreEtiqueta, color }];
  handleChange("etiquetas", updatedEtiquetas); // Asegúrate de que se guarda en cardData
  try {
    const updatedCard = { ...cardData, etiquetas: updatedEtiquetas }; // Guarda en cardData
    await updateCard(cardData.idTarjeta, updatedCard);
    toast.success("Etiqueta creada correctamente.", toastperso);
    setCardData(updatedCard); // Actualiza cardData
    onUpdateCard(updatedCard);
  } catch (error) {
    console.error("Error agregando etiqueta:", error.message);
  }
};

const eliminarEtiqueta = async (index) => {
  const updatedEtiquetas = cardData.etiquetas.filter((_, i) => i !== index);
  handleChange("etiquetas", updatedEtiquetas); // Asegúrate de que se guarda en cardData
  try {
    const updatedCard = { ...cardData, etiquetas: updatedEtiquetas }; // Guarda en cardData
    await updateCard(cardData.idTarjeta, updatedCard);
    toast.success("Etiqueta eliminada correctamente.", toastperso);
    setCardData(updatedCard); // Actualiza cardData
    onUpdateCard(updatedCard);
  } catch (error) {
    console.error("Error eliminando etiqueta:", error.message);
  }
};

const handleAssignUser = async (userId) => {
  try {
    setLoading(true);
    const updatedCard = { ...cardData, idUsuarioAsignado: userId }; // Guarda en cardData
    await updateCard(card.idTarjeta, updatedCard);
    const res = await getUser(userId);
    setUsuarioAsignado(res.data.username);
    toast.success("Usuario asignado correctamente.", toastperso);
    setCardData(updatedCard); // Actualiza cardData
    onUpdateCard(updatedCard);
  } catch (error) {
    console.error("Error asignando usuario:", error.message);
  } finally {
    setLoading(false);
  }
};

const handleAssignDueDate = async (newDueDate) => {
  try {
    setLoading(true);
    const updatedCard = { ...cardData, fechaVencimiento: newDueDate }; // Guarda en cardData
    await updateCard(card.idTarjeta, updatedCard);
    setFechaVencimiento(newDueDate);
    toast.success("Fecha de vencimiento asignada correctamente.", toastperso);
    setCardData(updatedCard); // Actualiza cardData
    onUpdateCard(updatedCard);
  } catch (error) {
    console.error("Error asignando fecha de vencimiento:", error.message);
  } finally {
    setLoading(false);
  }
};

const handleMoveCard = async (newListId) => {
  try {
    setLoading(true);
    const updatedCard = { ...cardData, idLista: newListId };
    await updateCard(card.idTarjeta, updatedCard);
    const res = await getList(newListId);
    const nombreLista = res.data.nombreLista;
    console.log(nombreLista)
    setNombreLista(nombreLista);
    toast.success(`Tarjeta movida a la lista ${res.data.nombreLista} correctamente.`, toastperso);
    setCardData(updatedCard); // Actualiza cardData
    onUpdateCard(updatedCard);
  } catch (error) {
    console.error("Error moviendo la tarjeta:", error.message);
  } finally {
    setLoading(false);
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
          <p>{card.fechaCreacion || "Fecha de creación no disponible"}</p>
          <h4 className="font-semibold mb-1">Fecha de vencimiento:</h4>
          {fechaVencimiento !== 'Sin fecha de vencimiento' ? (
            <p className={`${new Date(fechaVencimiento) < new Date() ? "text-red-500" : ""}`}>
              {new Date(fechaVencimiento).toISOString().split('T')[0]} {/* Formato YYYY-MM-DD */}
            </p>
          ) : (
            <p>{fechaVencimiento}</p>
          )}

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
          <button
            onClick={handleConfirmDeleteCard}
            className="bg-red-600 text-white rounded px-3 py-1 text-sm"
          >
            Eliminar tarjeta
          </button>
        </div>

        {showAssignUserModal && (
          <AssignUserModal
            idTarjeta={card.idTarjeta} 
            onClose={() => setShowAssignUserModal(false)} 
            onAssignUser={handleAssignUser} 
          />
        )}
        {showAssignDueDateModal && (
          <AssignDueDateModal
            idTarjeta={card.idTarjeta} 
            onClose={() => setShowAssignDueDateModal(false)} 
            onAssignDueDate={handleAssignDueDate} 
          />
        )}
        {showMoveCardModal && (
          <MoveCardModal 
            idLista={cardData.idLista}
            onClose={() => setShowMoveCardModal(false)} 
            onMoveCard={handleMoveCard} 
          />
        )}
      </div>
    </div>
  );
}
