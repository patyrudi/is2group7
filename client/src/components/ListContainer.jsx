import { useState } from "react";
import settingsIcon from '../images/settings.svg';
import alertIcon from '../images/alert.svg';
import { Card } from '../components/Card';

export function ListContainer({ list, cards, onSettingsClick }) {
  const [cardCount, setCardCount] = useState(cards.filter(card => card.idLista === list.idLista).length);

  const handleCardCreated = (newCount) => {
    setCardCount(newCount); // Actualiza el contador de tarjetas
  };

  return (
    <div
      className={`${
        (list.idEstado === 1 && cardCount <= list.maxWip)
          ? "bg-red-300"
          : (list.idEstado === 2 && cardCount <= list.maxWip)
          ? "bg-blue-300"
          : (list.idEstado === 3 && cardCount <= list.maxWip)
          ? "bg-green-300"
          : "bg-red-600"
      } shadow-md rounded-lg w-60 h-[600px] overflow-hidden`}
    >
      <div className="bg-cyan-950 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">{list.nombreLista}</h2>

        {(cardCount > list.maxWip) ? <img src={alertIcon} alt="Alert" className="w-6 h-6 cursor-pointer" /> : null}

        <img
          src={settingsIcon}
          alt="Settings"
          className="w-6 h-6 cursor-pointer"
          onClick={() => onSettingsClick(list)}
        />
      </div>
      <div className="p-4 h-full">
        <Card idLista={list.idLista} onCardCreated={handleCardCreated} />
      </div>
    </div>
  );
}
