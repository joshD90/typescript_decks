import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import "./home.css";
import Deck from "./Deck";
import getDecks from "../fetchUtils/getDeck";
import apiCreateDeck from "../fetchUtils/createDeck";

export type DecksResponse = {
  title: string;
  _id: string;
  __v: number;
};

const Home = () => {
  const [decks, setDecks] = useState<DecksResponse[] | []>([]);
  const [flashText, setFlashText] = useState("");
  const [error, setError] = useState("");

  //fetch all decks
  useEffect(() => {
    getDecks(setDecks, setError);
  }, []);

  //on clicking the form button
  const createDeck = async (e: FormEvent) => {
    e.preventDefault();
    apiCreateDeck(decks, setDecks, setError, flashText, setFlashText);
  };

  //reset error message
  useEffect(() => {
    const errorTimer = setTimeout(() => {
      setError("");
    }, 3000);
    () => clearTimeout(errorTimer);
  }, [error]);

  const inputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFlashText(e.target.value);
  };

  return (
    <div className="homeContainer">
      {error !== "" && <div className="errorBar">{error}</div>}
      <div className="deckContainer">
        {decks?.map((deck) => {
          return (
            <Deck
              deck={deck}
              setError={setError}
              setDecks={setDecks}
              key={deck._id}
            />
          );
        })}
      </div>
      <div className="formContainer">
        <form onSubmit={createDeck}>
          <div className="inputHolder">
            <label htmlFor="deckTitle">Deck Title</label>
            <input
              onChange={inputChange}
              placeholder="Flash Title Here"
              value={flashText}
              id="deckTitle"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
