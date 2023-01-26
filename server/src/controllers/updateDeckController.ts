import { Request, Response } from "express";

import { Deck } from "../../models/Deck";

// type Deck = {
//   title: string;
//   _id: mongoose.Types.ObjectId;
//   __v: number;
//   cards:
// };

const updateDeckController = async (req: Request, res: Response) => {
  try {
    const doc = await Deck.findById(req.params.deckId);
    if (!doc) throw Error("Could not find the document you wished to update");
    if (req.body.title) doc.title = req.body.title;
    if (req.body.cards) doc.cards = [...doc.cards, ...req.body.cards];

    const savedDeck = await doc.save();

    res.status(201).json(savedDeck);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default updateDeckController;
