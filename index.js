import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/userRoute.js";
import Cors from "cors";

config();

const app = express();
app.use(cookieParser());

const main = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const corsConfig = {
      credentials: true,
      origin: ["http://localhost:3000"],
    };
    app.use(Cors(corsConfig));
    app.use(express.json(), express.urlencoded({ extended: false }), userRoute);
    app.listen(7070, () => console.log("Connected to port 7070"));
  } catch (error) {
    console.log(error);
  }
};

main();
