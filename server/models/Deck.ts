import mongoose, { Schema } from "mongoose";

const DeckSchema = new Schema({
  title: { type: String },
  cards: { type: [{ type: Schema.Types.ObjectId, ref: "Card" }] },
});

export const Deck = mongoose.model("Deck", DeckSchema);
