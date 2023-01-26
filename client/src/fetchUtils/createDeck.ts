import React from "react";
import { DecksResponse } from "../components/Home";

const apiCreateDeck = async (
  decks: DecksResponse[],
  setDecks: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  flashText: string,
  setFlashText: React.Dispatch<React.SetStateAction<any>>
) => {
  if (flashText === "") return;
  try {
    //send off our data, fetch requires headers to convert into json
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/decks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: flashText }),
    });
    if (!response.ok) throw Error(response.statusText);
    //also have to run .json() to convert back into JSON format
    const data = await response.json();
    setDecks([...decks, data]);
    setFlashText("");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
};

export default apiCreateDeck;
