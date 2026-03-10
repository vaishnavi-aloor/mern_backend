import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dbConnect from "./config/db.js";
import { storeRouter } from "./routes/storeRoute.js";

const app = express();

dotenv.config();

// Middleware
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session Middleware
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use("/", storeRouter);

// Server start function
const startServer = async () => {
  try {
    await dbConnect();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();