import { Request, Response } from "express";
import Card from "../../models/Card";
import { Deck } from "../../models/Deck";

const deleteCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const cardId = req.params.cardId;

  try {
    //first delete the card
    const deletedCard = await Card.findByIdAndDelete(cardId);
    const deckToUpdate = await Deck.findById(deckId);
    if (!deckToUpdate) throw Error("Could not find Deck to delete card from");
    //then remove the card's object id from the associated list of object ids in the card
    deckToUpdate.cards.filter((id) => id != deletedCard?._id);
    const updatedDeck = await deckToUpdate.save();

    res.status(200).json(updatedDeck);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) res.status(500).json(error.message);
  }
};

export default deleteCardController;
