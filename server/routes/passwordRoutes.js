import { Router } from "express";
import Password from "../models/Password.js";
import { decrypt, encrypt } from "../utils/crypto.js";

export const passwordRouter = Router();

passwordRouter.get("/", async (req, res) => {
    const userId = req.userId;
    try {
        const passwords = await Password.getPasswords(userId);
        const decryptedPasswords = passwords.map(password => {
            try {
                const decryptedPassword = decrypt(
                    password.password,
                    password.iv,
                    password.auth_tag
                );

                return {
                    id: password.id,
                    site: password.site,
                    login: password.login,
                    password: decryptedPassword
                };
            } catch(e) {
                console.error("Ошибка при расшифровке", e);

                return {
                    id: password.id,
                    site: password.site,
                    login: password.login,
                    password: '*** Ошибка расшифровки ***',
                }
            }
        })
        res.json({ passwords: decryptedPasswords});
    } catch(e) {
        console.error(e);
        return res.status(500).json({ error: "Ошибка на стороне сервера" })
    }
});

passwordRouter.post("/", async (req, res) => {
    const {site, login, password} = req.body;
    const userId = req.userId;
    try {
        if (!site || !login || !password) {
            return res.status(404).json("Все поля должны быть заполнены!");
        }
        const {encrypted, iv, authTag} = encrypt(password);
        const savedPassword = await Password.addPassword(userId, site, login, encrypted, iv, authTag);
        
        let decryptedPassword = decrypt(savedPassword.password, savedPassword.iv, savedPassword.auth_tag);

        res.json({ newPassword: {
            id: savedPassword.id,
            site: savedPassword.site,
            login: savedPassword.login,
            password: decryptedPassword
        } });
    } catch(e) {
        console.error(e);
        return res.status(500).json({ error: "Ошибка при добавлении пароля" })
    }
});

passwordRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;
    try {
        const result = await Password.deletePassword(id, userId);
        res.json({result})
    } catch(e) {
        console.error(e);
        return res.status(500).json({ error: "Ошибка при удалении" })
    }
})

passwordRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {site, login, password} = req.body;
    const userId = req.userId;
    try {
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Неверный ID" });
        }

        if (!site || !login || !password) {
            return res.status(400).json({ 
                error: "Все поля (site, login, password) обязательны" 
            });
        }

        const {encrypted, iv, authTag} = encrypt(password);

        const updatedPassword = await Password.updatePassword(id, userId, site, login, encrypted, iv, authTag);
  
        if (!updatedPassword) {
            return res.status(404).json({ error: "Пароль не найден" });
        }

        const decryptedPassword = decrypt(updatedPassword.password, updatedPassword.iv, updatedPassword.auth_tag);

        res.json({ updatedPassword: {
            id: updatedPassword.id,
            site: updatedPassword.site,
            login: updatedPassword.login,
            password: decryptedPassword
        } });
    } catch(e) {
        console.error(e);
        return res.status(500).json({ error: "Ошибка при обновлении" })
    }
})