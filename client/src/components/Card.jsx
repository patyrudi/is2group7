import { useState, useEffect } from "react";
import { getAllCards, createCard } from "../api/tarjeta.api.js";
import { getAllAssignedUsers } from "../api/usuarios_asignados.api.js";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getUser } from '../api/usuarios.api.js';

export function Card({ idLista, onCardCreated }) {
  const [cards, setCards] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { idEspacio } = useParams();

  useEffect(() => {
    loadCards();
    loadAssignedUsersWithNames();
  }, [idLista]);

  async function loadCards() {
    try {
      const res = await getAllCards();
      const filteredCards = res.data.filter((card) => card.idLista === idLista);
      setCards(filteredCards);
      onCardCreated(filteredCards.length); // Llama a la función pasada por props para actualizar el contador
    } catch (error) {
      console.error("Error fetching cards:", error.message);
    }
  }

  async function loadAssignedUsersWithNames() {
    try {
      const res = await getAllAssignedUsers();
      const filteredUsers = res.data.filter((user) => user.idEspacio === parseInt(idEspacio));

      // Obtener los detalles de los usuarios asignados
      const usersWithNames = await Promise.all(
        filteredUsers.map(async (user) => {
          const userDetails = await getUser(user.idUser); // Llamar a la API para obtener los detalles
          return { ...user, username: userDetails.data.username }; // Agregar el nombre de usuario
        })
      );

      setAssignedUsers(usersWithNames);
    } catch (error) {
      console.error("Error fetching assigned users:", error.message);
    }
  }

  const handleCardClick = (card) => {
    toast(
      (t) => (
        <div>
          <button onClick={() => toast.dismiss(t.id)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
            ✖️
          </button>
          <h3 className="text-xl font-bold">{card.nombreActividad}</h3>
          <p>{card.descripcionTarjeta || "Sin descripción"}</p>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  }; 

  const handleCreateCard = () => {
    setIsCreating(true);
    toast(
      (t) => (
        <div>
          <button onClick={() => toast.dismiss(t.id)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
            ✖️
          </button>
          <h3 className="text-xl font-bold">Crear nueva tarjeta</h3>
          <CreateCardForm
            onCancel={() => {
              setIsCreating(false);
              toast.dismiss(t.id);
            }}
            idLista={idLista}
            assignedUsers={assignedUsers}
            onCardCreated={loadCards} // Recargar las tarjetas después de la creación
          />
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <div
          key={card.idTarjeta}
          className="border p-2 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => handleCardClick(card)}
        >
          <h4 className="font-semibold">{card.nombreActividad}</h4>
          <p>{card.descripcionTarjeta || "Sin descripción"}</p>
        </div>
      ))}
      {!isCreating && (
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreateCard}
        >
          Crear nueva tarjeta
        </button>
      )}
    </div>
  );
}

function CreateCardForm({ onCancel, idLista, assignedUsers, onCardCreated }) {
  const [nombreActividad, setNombreActividad] = useState("");
  const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [idUsuarioAsignado, setIdUsuarioAsignado] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaCreacion = getCurrentDate(); // Fecha de hoy
    const fechaVencimientoDate = new Date(fechaVencimiento);

    if (fechaVencimientoDate <= new Date(fechaCreacion)) {
      alert("La fecha de vencimiento debe ser posterior a la fecha de creación.");
      return;
    }

    const newCard = {
      nombreActividad,
      descripcionTarjeta,
      fechaCreacion,
      fechaVencimiento,
      idLista,
      idUsuarioAsignado,
    };

    try {
      await createCard(newCard); // Llamada a la API para crear la tarjeta
      console.log("Card created:", newCard);
      onCardCreated(); // Recargar las tarjetas después de la creación
      onCancel(); // Cerrar el formulario
    } catch (error) {
      console.error("Error creating card:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre de la actividad"
        value={nombreActividad}
        onChange={(e) => setNombreActividad(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcionTarjeta}
        onChange={(e) => setDescripcionTarjeta(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <select
        value={idUsuarioAsignado}
        onChange={(e) => setIdUsuarioAsignado(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="">Asignar usuario</option>
        {assignedUsers.map((user) => (
          <option key={user.idUser} value={user.idUser}>
            {user.username} - {user.tipoUsuario}
          </option>
        ))}
      </select>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
          Cancelar
        </button>
        <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
          Crear
        </button>
      </div>
    </form>
  );
}
