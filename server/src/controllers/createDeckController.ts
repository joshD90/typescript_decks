import { Response, Request } from "express";

import { Deck } from "../../models/Deck";

const createDeckController = async (req: Request, res: Response) => {
  //destructure our req.body
  const { title }: { title: string } = req.body;
  //push the destructured title into a newly instantiated Deck class
  const newDeck = new Deck({ title: title });
  try {
    const createdDeck = await newDeck.save();
    res.status(201).json(createdDeck);
  } catch (error) {
    res
      .status(500)
      .send(
        "There was an issue when trying to save the document to the database"
      );
  }
};

export default createDeckController;
