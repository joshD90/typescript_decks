import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import "./home.css";
import Deck from "./Deck";

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
    const fetchDecks = (async () => {
      try {
        const response = await fetch("http://localhost:5000/decks");
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          console.log("it is an array");
          setDecks(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        }
      }
    })();
  }, []);

  //on clicking the form button
  const createDeck = async (e: FormEvent) => {
    e.preventDefault();
    if (flashText === "") return;
    try {
      //send off our data, fetch requires headers to convert into json
      const response = await fetch("http://localhost:5000/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: flashText }),
      });
      if (!response.ok) throw Error(response.statusText);
      //also have to run .json() to convert back into JSON format
      const data = await response.json();
      setFlashText("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
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
          return <Deck deck={deck} key={deck._id} />;
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
