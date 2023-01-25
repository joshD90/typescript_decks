import React from "react";
import apiDeleteDeck from "../fetchUtils/apiDeleteDeck";
import "./deck.css";

import { DecksResponse } from "./Home";

type Props = {
  deck: DecksResponse;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setDecks: React.Dispatch<React.SetStateAction<any>>;
};

const Deck: React.FC<Props> = ({ deck, setError, setDecks }) => {
  const deleteCard = () => {
    apiDeleteDeck(deck, setDecks, setError);
  };

  return (
    <div className="card">
      <button onClick={deleteCard}>Del</button>
      <h3>{deck.title}</h3>
      <div>This should be the place for the deck body</div>
    </div>
  );
};

export default Deck;
