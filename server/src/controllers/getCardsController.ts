import { Request, Response } from "express";
import { Deck } from "../../models/Deck";

const getCardsController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;

  try {
    //find the deck
    const response = await Deck.findById(deckId);
    if (!response) throw Error("Could not find a document with this Id");
    //expand the cards field and populate with cards
    const deckExpanded = await response.populate("cards");

    res.status(200).json(deckExpanded);
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
};

export default getCardsController;
