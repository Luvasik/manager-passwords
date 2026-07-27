import express from "express";
import cors from 'cors';
import sqlite from "sqlite3";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewre/authMiddleware.js";
import { userRouter } from "./routes/userRoutes.js";
import { passwordRouter } from "./routes/passwordRoutes.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/passwords", authMiddleware, passwordRouter)

export const db = new sqlite.Database("./password-manager.db", (err) => {
    if (err) console.log(err);
    else console.log("Подключено к БД");
})

app.listen(3000, () => console.log('Сервер запущен'));