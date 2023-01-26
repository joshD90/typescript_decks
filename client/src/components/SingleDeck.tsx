import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";

import "./singleDeck.css";
import { DecksResponse } from "./Home";
import Deck from "./Deck";
import getCards from "../fetchUtils/getCards";
import apiCreateCard from "../fetchUtils/apiCreateCard";
import DeckCard from "./Card";

export type Card = {
  title: string;
  _id?: string;
  body?: string;
};

const SingleDeck = () => {
  const [deck, setDeck] = useState<DecksResponse | null>(null);
  const [error, setError] = useState("");
  const [cardInputs, setCardInputs] = useState<Card>({ title: "", body: "" });
  //grab our id for our fetch
  const { id } = useParams<{ id?: string }>();

  //grab our single deck
  useEffect(() => {
    if (!id) return;
    getCards(setDeck, setError, id);
  }, []);

  const cardInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const addCard = (e: FormEvent) => {
    e.preventDefault();
    if (!id)
      return setError("There does not seem to be any deck to put this into");
    apiCreateCard(id, cardInputs, setDeck, setError);
  };

  return (
    <div className="singleDeckContainer">
      {error && <p>{error}</p>}
      {deck && <Deck deck={deck} setError={setError} setDecks={setDeck} />}
      <div className="cardsContainer">
        {deck?.cards?.map((card: Card) => {
          return (
            <DeckCard
              key={card._id}
              card={card}
              deckId={deck._id}
              setError={setError}
              setDeck={setDeck}
            />
          );
        })}
      </div>
      <div className="createCardContainer">
        <h3>Create a New Card</h3>
        <form onSubmit={addCard}>
          <div className="inputDiv">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={cardInputs.title}
              placeholder="Enter Card Title Here"
              onChange={cardInputChange}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="body">Text</label>
            <input
              id="body"
              value={cardInputs.body}
              placeholder="Enter Card Title Here"
              onChange={cardInputChange}
            />
          </div>
          <button type="submit">Create Card</button>
        </form>
      </div>
    </div>
  );
};

export default SingleDeck;
