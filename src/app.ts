import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/user";

// MongoDB Setup
import dotenv from "dotenv";
dotenv.config();

const DB_ID = process.env.DB_ID;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_ID}:${DB_PASSWORD}@cluster0.d9zki.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connection is successfully.");
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000...");
});
