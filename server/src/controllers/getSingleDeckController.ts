import { Request, Response } from "express";

import { Deck } from "../../models/Deck";

const getSingleDeckController = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deck = await Deck.findById(id);
    console.log(deck);
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getSingleDeckController;
