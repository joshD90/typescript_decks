import { Request, Response } from "express";

import { Deck } from "../../models/Deck";

const deleteDeckController = async (req: Request, res: Response) => {
  console.log(req.params.deckId);
  try {
    const deletedDeck = await Deck.findByIdAndDelete(req.params.deckId);
    res.status(200).json({
      message: "successfully deleted the entry",
      deleted: deletedDeck,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default deleteDeckController;
