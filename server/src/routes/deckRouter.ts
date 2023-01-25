import express, { application, Request, Response } from "express";
import mongoose from "mongoose";

import { Deck } from "../../models/Deck";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  //if there are no search params associated with the get request get all documents
  if (!req.query.searchTerm || !req.query.field) {
    try {
      //result will derive its type from Mongoose
      const result = await Deck.find();
      if (result.length === 0)
        return res.status(404).send("There are no Decks in the database");
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  //creating a /searchTerm/ creates a LIKE search
  const searchRegex = new RegExp(`${req.query.searchTerm}`, "i");
  //by declaring this first we ensure that it is always held as a string to satisfy tsrs
  const searchField = `${req.query.field}`;
  try {
    const result = await Deck.find({
      [searchField]: { $regex: searchRegex },
    });
    if (result.length === 0)
      return res.status(404).send("There was no record matching this criteria");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
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
});

//deleting a deck
router.delete("/:deckId", async (req: Request, res: Response) => {
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
});

export default router;
