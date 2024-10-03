import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllLists, createList, updateList, deleteList } from "../api/lista.api.js";
import { getAllCards } from "../api/tarjeta.api.js";
import { toast } from "react-hot-toast";
import { ListSettingsForm } from "./ListSettingsForm";
import { CreateListForm } from "./CreateListForm";
import { ListContainer } from "./ListContainer";

export function ListList() {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const params = useParams();
  const idTablero = params.idTablero;
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [cardsCount, setCardsCount] = useState({});

  useEffect(() => {
    loadLists();
    loadCards();
  }, [idTablero]); // Dependencia de idTablero

  useEffect(() => {
    const countCards = () => {
      const count = {};
      cards.forEach(card => {
        count[card.idLista] = (count[card.idLista] || 0) + 1;
      });
      setCardsCount(count);
    };

    countCards();
  }, [cards]);

  async function loadLists() {
    try {
      const res = await getAllLists();
      // Filtrar listas por el idTablero actual
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

  const handleCreateCard = async (cardData) => {
    try {
      const res = await createCard(cardData); // Aquí llamas a tu API para crear la tarjeta
      setCards((prevCards) => [...prevCards, res.data]); // Agrega la nueva tarjeta al estado
    } catch (error) {
      console.error("Error creando la tarjeta:", error.message);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto">
      {lists.map((list) => (
        <ListContainer key={list.idLista} list={list} cards={cards} onSettingsClick={handleSettingsClick} />
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

                  // Crear el objeto JSON para enviarlo a createList
                  const nuevaLista = {
                    "nombreLista": nombreLista,
                    "maxWip": parseInt(maxWip),
                    "idEstado": parseInt(idEstado),
                    "idTablero": parseInt(idTablero) // Usar idTablero para la nueva lista
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
