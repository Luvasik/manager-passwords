import crypto from 'crypto';
import 'dotenv/config';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error("Ошибка, ENCRYPTION_KEY не задан в файле")
}

const KEY = Buffer.from(ENCRYPTION_KEY, 'hex');

if (KEY.length !== 32) {
    throw new Error("KEY Должен быть длинной 32 символа");
}

export function encrypt(text) {
    // iv на случай если 2 пользователя введут одинаковый пароль
    const iv = crypto.randomBytes(12);

    // Объект с методами для шифрования
    const cipher = crypto.createCipheriv(
        "aes-256-gcm",
        KEY,
        iv
    )

    const encrypted = Buffer.concat([
        cipher.update(text, 'utf-8'),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
        encrypted: encrypted.toString("hex"),
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex")
    }
}

export function decrypt(encrypted, iv, authTag) {
    const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        KEY,
        Buffer.from(iv, "hex")
    )

    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encrypted, "hex")),
        decipher.final()
    ]);

    return decrypted.toString("utf-8");
}