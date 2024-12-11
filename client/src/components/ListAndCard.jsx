import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchCardsByUsername, searchCardsByEtiqueta } from "../api/tarjeta.api.js";
import { getAllLists, updateList, createList, deleteList } from "../api/lista.api.js";
import { getAllAssignedUsers } from "../api/usuarios_asignados.api.js";
import { toast } from "react-hot-toast";
import { ListSettingsForm } from "./ListSettingsForm";
import { CreateListForm } from "./CreateListForm";
import settingsIcon from "../images/settings.svg";
import alertIcon from "../images/alert.svg";
import { CardItem } from "../components/CardItem";
import { CreateCardForm } from "../components/CreateCardForm";
import { CardModal } from "../components/CardModal";
import { getUser } from "../api/usuarios.api.js";

export function ListAndCard() {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [creatingCardListId, setCreatingCardListId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const params = useParams();
  const idTablero = params.idTablero;
  const idEspacio = params.idEspacio;

  useEffect(() => {
    loadData();
    loadAvailableUsers();
  }, [idTablero]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedUser]);

  async function loadAvailableUsers() {
    try {
      const resAssignedUsers = await getAllAssignedUsers();
      const usuariosFiltrados = resAssignedUsers.data.filter(
        (usuario) => usuario.idEspacio === parseInt(idEspacio)
      );

      const detallesUsuarios = await Promise.all(
        usuariosFiltrados.map(async (usuario) => {
          const userData = await getUser(usuario.idUser);
          return { id: usuario.idUser, username: userData.data.username };
        })
      );

      setAvailableUsers(detallesUsuarios);
    } catch (error) {
      console.error("Error fetching available users:", error.message);
    }
  }

  async function loadData() {
    try {
      const resLists = await getAllLists();
      const filteredLists = resLists.data.filter(
        (list) => list.idTablero === parseInt(idTablero)
      );
      setLists(filteredLists);

      const resCards = await searchCardsByEtiqueta("");
      setCards(resCards.data);
    } catch (error) {
      console.error("Error fetching lists or cards:", error.message);
    }
  }

  async function applyFilters() {
    try {
      let filteredCards = [];

      if (searchTerm) {
        const resCardsByEtiqueta = await searchCardsByEtiqueta(searchTerm);
        filteredCards = resCardsByEtiqueta.data;
      }

      if (selectedUser) {
        const resCardsByUsername = await searchCardsByUsername(selectedUser);
        filteredCards = searchTerm
          ? filteredCards.filter((card) =>
              resCardsByUsername.data.some(
                (c) => c.idTarjeta === card.idTarjeta
              )
            )
          : resCardsByUsername.data;
      }

      if (!searchTerm && !selectedUser) {
        const resCards = await searchCardsByEtiqueta("");
        filteredCards = resCards.data;
      }

      setCards(filteredCards);
    } catch (error) {
      console.error("Error applying filters:", error.message);
    }
  }

  const handleSettingsClick = (list) => {
    toast(
      (t) => (
        <ListSettingsForm
          list={list}
          onUpdate={async (updatedList) => {
            const nombreLista = document.getElementById("nombreLista").value;
            const maxWip = document.getElementById("maxWip").value;
            const idEstado = document.getElementById("idEstado").value;

            try {
              await updateList(list.idLista, { nombreLista, maxWip, idEstado });
              toast.success("Lista actualizada correctamente!");
              toast.dismiss(t.id);
              loadData();
            } catch (error) {
              console.error("Error actualizando la lista:", error.message);
            }
          }}
          onDelete={async (idLista) => {
            try {
              await deleteList(idLista);
              toast.success("Lista eliminada correctamente!");
              toast.dismiss(t.id);
              loadData();
            } catch (error) {
              console.error("Error eliminando la lista:", error.message);
            }
          }}
        />
      ),
      { duration: Infinity }
    );
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
    loadData();
  };

  const handleCreateCard = (listId) => {
    setCreatingCardListId(listId);
  };

  const handleCancelCreateCard = () => {
    setCreatingCardListId(null);
  };


  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por etiqueta"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded text-black"
        />

      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        className="border p-2 rounded text-black"
        defaultValue=""
      >
        <option value="">Seleccionar usuario</option>
        {availableUsers.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>



        <button
          className="bg-[#7B60B0] hover:bg-[#65439A] rounded-lg p-4"
          onClick={() =>
            toast(
              (t) => (
                <CreateListForm
                  onCreate={async () => {
                    const nombreLista = document.getElementById("nombreLista").value;
                    const maxWip = document.getElementById("maxWip").value;
                    const idEstado = document.getElementById("idEstado").value;

                    const nuevaLista = {
                      "nombreLista": nombreLista,
                      "maxWip": parseInt(maxWip),
                      "idEstado": parseInt(idEstado),
                      "idTablero": parseInt(idTablero)
                    };

                    try {
                      await createList(nuevaLista);
                      toast.success("Lista creada correctamente!");
                      toast.dismiss(t.id);
                      loadData();
                    } catch (error) {
                      console.error("Error creando la lista:", error.message);
                    }
                  }}
                />
              ),
              { duration: Infinity }
            )
          }
        >
          + Crear Lista
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4">
        {lists.map((list) => (
          <div key={list.idLista} className={`${
            (list.idEstado === 1 && cards.filter(card => card.idLista === list.idLista).length <= list.maxWip)
              ? "bg-[#fecaca]"
              : (list.idEstado === 2 && cards.filter(card => card.idLista === list.idLista).length <= list.maxWip)
              ? "bg-[#a7f3d0]"
              : (list.idEstado === 3 && cards.filter(card => card.idLista === list.idLista).length <= list.maxWip)
              ? "bg-[#fde68a]"
              : "bg-red-500"
          } shadow-md rounded-lg w-60 h-[600px] overflow-hidden`}>
            <div className="bg-gray-700 shadow-md p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{list.nombreLista}</h2>
              {cards.filter(card => card.idLista === list.idLista).length > list.maxWip && (
                <img src={alertIcon} alt="Alert" className="w-6 h-6 cursor-pointer" />
              )}
              <img
                src={settingsIcon}
                alt="Settings"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleSettingsClick(list)}
              />
            </div>
            <div className="p-4 h-full">
              <div className="flex flex-col gap-2">
                {cards.filter(card => card.idLista === list.idLista).map((card) => (
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
                    onUpdateCard={async (updatedCard) => {
                      const updatedCards = cards.map((card) => 
                        card.idTarjeta === updatedCard.idTarjeta ? updatedCard : card
                      );
                      setCards(updatedCards);
                      await loadData();
                    }}
                  />
                )}

                {creatingCardListId === list.idLista ? ( // Comprobar si el ID de la lista actual es el que se está creando
                  <CreateCardForm
                    idLista={list.idLista}
                    onCancel={handleCancelCreateCard}
                    onCardCreated={async () => {
                      await loadData();
                      setCreatingCardListId(null); // Reiniciar el ID al crear una tarjeta
                    }}
                  />
                ) : (
                  <button
                    className="mt-4 py-2 px-4 bg-white text-gray-500 rounded hover:bg-gray-200"
                    onClick={() => handleCreateCard(list.idLista)} // Pasar el ID de la lista
                  >
                    + Agregar nueva tarea
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
