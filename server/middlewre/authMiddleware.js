import jwt from 'jsonwebtoken'
import "dotenv/config"
export default function(req, res, next) {
    try {
        const token = req.cookies.Token;

        if (!token) {
            return res.status(401).json({ message: "Токен не найден" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Устаревший токен" });
        }
        req.userId = decoded.userId;
        next();
    } catch(e) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}