import React from "react";
import { DecksResponse } from "../components/Home";

const apiDeleteCard = async (
  deckId: string,
  cardId: string | undefined,
  setDeck: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>
) => {
  if (!cardId) return;
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/decks/${deckId}/cards/${cardId}`;

  try {
    //delete the card
    const response = await fetch(url, { method: "DELETE" });
    if (!response) throw Error("Something went wrong with deleting the card");
    //optimistic delete of card from working deck
    setDeck((prev: DecksResponse) => {
      return {
        ...prev,
        cards: prev.cards.filter((card) => card._id != cardId),
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
};

export default apiDeleteCard;
