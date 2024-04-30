import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

const app = express();

const main = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.use(express.json(), express.urlencoded({ extended: false }));
    app.listen(7070, () => console.log("Connected to port 7070"));
  } catch (error) {
    console.log(error);
  }
};

main();
