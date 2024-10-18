import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllLists, createList, updateList, deleteList } from "../api/lista.api.js";
import { getAllCards, updateCard } from "../api/tarjeta.api.js";
import { toast } from "react-hot-toast";
import { ListSettingsForm } from "./ListSettingsForm";
import { CreateListForm } from "./CreateListForm";
import settingsIcon from '../images/settings.svg';
import alertIcon from '../images/alert.svg';
import { Card } from '../components/Card';

export function ListList() {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const params = useParams();
  const idTablero = params.idTablero;
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadLists();
    loadCards();
  }, [idTablero]);

  async function loadLists() {
    try {
      const res = await getAllLists();
      const filteredLists = res.data.filter(list => list.idTablero === parseInt(idTablero));
      setLists(filteredLists);
    } catch (error) {
      console.error("Error fetching lists:", error.message);
    }
  }

  async function loadCards() {
    try {
      const res = await getAllCards();
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error.message);
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
              loadLists();
            } catch (error) {
              console.error("Error actualizando la lista:", error.message);
            }
          }}
          onDelete={async (idLista) => {
            try {
              await deleteList(idLista);
              toast.success("Lista eliminada correctamente!");
              toast.dismiss(t.id);
              loadLists();
            } catch (error) {
              console.error("Error eliminando la lista:", error.message);
            }
          }}
        />
      ),
      { duration: Infinity }
    );
  };

  const handleUpdateCard = (updatedCard) => {
    setCards((prevCards) => {
      return prevCards.map(card =>
        card.idTarjeta === updatedCard.idTarjeta ? updatedCard : card
      );
    });
  };

  const handleCardCreated = (newCard) => {
    handleUpdateCard(newCard);
  };

  return (
    <div className="flex gap-4 overflow-x-auto">
      {lists.map((list) => (
        <div key={list.idLista} className={`${
          (list.idEstado === 1 && cards.filter(card => card.idLista === list.idLista).length <= list.maxWip)
            ? "bg-red-300"
            : (list.idEstado === 2 && cards.filter(card => card.idLista === list.idLista).length <= list.maxWip)
            ? "bg-blue-300"
            : (list.idEstado === 3 && cards.filter(card => card.idLista === list.idLista).length <= list.maxWip)
            ? "bg-green-300"
            : "bg-red-600"
        } shadow-md rounded-lg w-60 h-[600px] overflow-hidden`}>
          <div className="bg-cyan-950 p-4 flex justify-between items-center">
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
            <Card 
              idLista={list.idLista} 
              onCardCreated={handleCardCreated} 
              onUpdateCard={handleUpdateCard} 
            />
          </div>
        </div>
      ))}

      <button
        className="bg-green-400 w-60 h-16 rounded-lg p-4"
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
                    loadLists();
                  } catch (error) {
                    console.log(nuevaLista);
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
  );
}
