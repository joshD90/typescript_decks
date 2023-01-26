import mongoose, { Schema } from "mongoose";

const CardSchema = new Schema({
  title: String,
  body: String,
});

const Card = mongoose.model("Card", CardSchema);

export default Card;
