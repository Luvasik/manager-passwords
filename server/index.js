import express from "express";
import cors from 'cors';
import sqlite from "sqlite3";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewre/authMiddleware.js";
import { userRouter } from "./routes/userRoutes.js";
import { passwordRouter } from "./routes/passwordRoutes.js";
import "dotenv/config"

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || "./password-manager.db";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"

const app = express();
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/passwords", authMiddleware, passwordRouter);

export const db = new sqlite.Database(DB_PATH, (err) => {
    if (err) console.log(err);
    else console.log("Подключено к БД");
});

app.listen(PORT, "0.0.0.0", () => console.log('Сервер запущен'));