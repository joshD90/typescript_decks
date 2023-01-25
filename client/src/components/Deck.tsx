import React from "react";
import "./deck.css";

import { DecksResponse } from "./Home";

type Props = {
  deck: DecksResponse;
};

const Deck: React.FC<Props> = ({ deck }) => {
  return (
    <div className="card">
      <h3>{deck.title}</h3>
      <div>This should be the place for the deck body</div>
    </div>
  );
};

export default Deck;
