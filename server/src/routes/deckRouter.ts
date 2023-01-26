import express from "express";

import getDeckController from "../controllers/getDeckController";
import deleteDeckController from "../controllers/deleteDeckController";
import createDeckController from "../controllers/createDeckController";
import getSingleDeckController from "../controllers/getSingleDeckController";
import getCardsController from "../controllers/getCardsController";
import updateDeckController from "../controllers/updateDeckController";
import createCardController from "../controllers/createCardController";
import deleteCardController from "../controllers/deleteCardController";

const router = express.Router();
//deck routes
router.get("/:id", getSingleDeckController);
router.get("/", getDeckController);
router.post("/", createDeckController);
router.delete("/:deckId", deleteDeckController);
router.put("/:deckId", updateDeckController);

//card routes
router.get("/:deckId/cards", getCardsController);
router.post("/:deckId/cards", createCardController);
router.delete("/:deckId/cards/:cardId", deleteCardController);

export default router;
