import { useState, useEffect } from "react";
import { getAllCards } from "../api/tarjeta.api.js";
import { getAllAssignedUsers } from "../api/usuarios_asignados.api.js";
import { useParams } from "react-router-dom";
import { getUser } from "../api/usuarios.api.js";
import { CardItem } from "../components/CardItem";
import { CreateCardForm } from "../components/CreateCardForm";
import { CardModal } from "../components/CardModal";

export function Card({ idLista, onCardCreated }) {
  const [cards, setCards] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idEspacio } = useParams();

  useEffect(() => {
    loadCards();
    loadAssignedUsersWithNames();
  }, [idLista]);

  useEffect(() => {
    if (selectedCard) {
      loadCards();
    }
  }, [selectedCard]);

  async function loadCards() {
    try {
      const res = await getAllCards();
      const filteredCards = res.data.filter((card) => card.idLista === idLista);
      setCards(filteredCards);
      onCardCreated(filteredCards.length);
    } catch (error) {
      console.error("Error fetching cards:", error.message);
    }
  }

  async function loadAssignedUsersWithNames() {
    try {
      const res = await getAllAssignedUsers();
      const filteredUsers = res.data.filter(
        (user) => user.idEspacio === parseInt(idEspacio)
      );

      const usersWithNames = await Promise.all(
        filteredUsers.map(async (user) => {
          const userDetails = await getUser(user.idUser);
          return { ...user, username: userDetails.data.username };
        })
      );

      setAssignedUsers(usersWithNames);
    } catch (error) {
      console.error("Error fetching assigned users:", error.message);
    }
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleCreateCard = () => {
    setIsCreating(true);
  };

  const handleCancelCreateCard = () => {
    setIsCreating(false);
  };

  const handleUpdateCard = (updatedCard) => {
    const updatedCards = cards.map((card) => 
      card.idTarjeta === updatedCard.idTarjeta ? updatedCard : card
    );
    setCards(updatedCards);
    onCardCreated(updatedCards.length);  // Notifica a ListContainer
  };
  
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <CardItem
          key={card.idTarjeta}
          card={card}
          onClick={() => handleCardClick(card)}
        />
      ))}

      {isModalOpen && selectedCard && (
        <CardModal 
          card={selectedCard} 
          onClose={handleCloseModal}
          onUpdateCard={handleUpdateCard}
        />
      )}

      {!isCreating ? (
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreateCard}
        >
          Crear nueva tarjeta
        </button>
      ) : (
        <CreateCardForm
          idLista={idLista}
          onCancel={handleCancelCreateCard}
          onCardCreated={loadCards}
        />
      )}
    </div>
  );
}