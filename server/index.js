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
    if (err) {
        console.log(err);
        return;
    }
    console.log("Подключено к БД");

    db.serialize(() => {
        // Таблица пользователей
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                "id"	INTEGER NOT NULL UNIQUE,
                "email"	TEXT NOT NULL UNIQUE,
                "password"	TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
            )
        `, (err) => {
            if (err) console.log("Ошибка создания таблицы users:", err);
            else console.log("Таблица users создана/существует");
        });
        
        // Таблица паролей
        db.run(`
            CREATE TABLE IF NOT EXISTS passwords (
                "id"	INTEGER NOT NULL UNIQUE,
                "user_id"	INTEGER NOT NULL,
                "site"	TEXT NOT NULL,
                "login"	TEXT NOT NULL,
                "password"	TEXT NOT NULL,
                "iv"	TEXT,
                "auth_tag"	INTEGER,
                PRIMARY KEY("id" AUTOINCREMENT),
                FOREIGN KEY("user_id") REFERENCES "users"("id")
            )
        `, (err) => {
            if (err) console.log("Ошибка создания таблицы passwords:", err);
            else console.log("Таблица passwords создана/существует");
        });
    });
});

app.listen(PORT, "0.0.0.0", () => console.log('Сервер запущен'));