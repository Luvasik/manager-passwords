import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userRouter = Router();

userRouter.get("/token", (req, res) => {
    const token = req.cookies.Token;

    if (!token) {
        return res.json({ isToken: false, message: "Токен не найден" });
    }

    const decoded = jwt.verify(token, 'SECRET_KEY');

    if (!decoded) {
        return res.json({ isToken: false, message: "Токен истек" });
    }

    res.json({ isToken: true })
})

userRouter.post("/registration", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({ message: "Введите email и пароль" })
        }

        const candidate = await User.findUserByEmail(email);

        if (candidate) {
            return res.status(401).json({ message: "Пользователь с таким email уже существует" })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        User.createUser(email, hashedPassword);

        res.json({ message: "Пользователь создан" })
    } catch (e) {
        console.error(e);
        return res.status(501).json({ error: "Ошибка при создании пользователя" });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({ message: "Введите email и пароль" })
        }

        const user = await User.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" })
        }

        const isCompare = bcrypt.compareSync(password, user.password);

        if (!isCompare) {
            return res.status(404).json({ message: "Неверный emial или пароль" })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "5h" })

        res.cookie("Token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: "Успешный вход" });
    } catch (e) {
        console.error(e);
        return res.status(501).json({ error: "Ошибка при попытке входа" })
    }
});