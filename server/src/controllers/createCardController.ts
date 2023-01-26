import { Response, Request } from "express";
import { Deck } from "../../models/Deck";
import Card from "../../models/Card";

type CardType = {
  title: string;
  body: string;
};

const createCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const { title, body }: CardType = req.body;
  const newCard = new Card({ title, body });
  try {
    const createdCard = await newCard.save();
    //now add this new card to the relevant deck
    const deckToUpdate = await Deck.findById(deckId);
    if (!deckToUpdate)
      throw Error("Card Created but could not find the deck to add it to");
    deckToUpdate.cards = [...deckToUpdate.cards, createdCard._id];
    await deckToUpdate.save();
    res.status(201).json(createdCard);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) res.status(500).json(error.message);
  }
};

export default createCardController;
