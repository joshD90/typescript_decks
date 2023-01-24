import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import deckRouter from "./routes/deckRouter";

const app = express();
//this allows for only fields that have been set in our schema to be used
mongoose.set("strictQuery", true);

//set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configure our routes
app.use("/decks", deckRouter);

app.get("/", (req: Request, res: Response) => {
  console.log("instant huh");
  res.status(200).send("Hello Rotten World");
});

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
  console.log("MongoDB server is connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is Listening on Port ${process.env.PORT}`);
  });
});
