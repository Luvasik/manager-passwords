import { db } from "../index.js";


class User {
    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email=?", [email], (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    createUser(email, password) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users(email, password) VALUES(?, ?)",
                [email, password],
                function (err) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve({ id: this.lastId, email, password })
                    }
                }
            )
        })
    }
}

export default new User();