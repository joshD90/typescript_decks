import mongoose, { Schema } from "mongoose";

const DeckSchema = new Schema({ title: { type: String } });

export const Deck = mongoose.model("Deck", DeckSchema);
