import React from "react";

import { Card } from "./SingleDeck";
import apiDeleteCard from "../fetchUtils/apiDeleteCard";
import "./card.css";

type Props = {
  card: Card;
  setDeck: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  deckId: string;
};

const DeckCard: React.FC<Props> = ({ card, deckId, setDeck, setError }) => {
  const deleteCard = () => {
    apiDeleteCard(deckId, card._id, setDeck, setError);
  };

  return (
    <div className="container">
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      <div className="delete" onClick={deleteCard}>
        X
      </div>
    </div>
  );
};

export default DeckCard;
