import { DecksResponse } from "../components/Home";
import { Card } from "../components/SingleDeck";

const apiCreateCard = async (
  deckId: string,
  body: Card,
  setDeck: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/decks/${deckId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response) throw Error("There was an issue saving the card");
    //optimistically add our new card into our deck
    const data = await response.json();
    setDeck((prev: DecksResponse) => {
      return { ...prev, cards: [...prev.cards, data] };
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) setError(error.message);
  }
};

export default apiCreateCard;
