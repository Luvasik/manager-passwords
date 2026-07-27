import { db } from "../index.js";

class Password {  
    getPasswords(userId) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM passwords WHERE user_id=?", [userId], (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }

    addPassword(userId, site, login, password, iv, authTag) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO passwords(user_id, site, login, password, iv, auth_tag) VALUES(?, ?, ?, ?, ?, ?)",
                [userId, site, login, password, iv, authTag],
                function (err, row) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return
                    } else {
                        const newId = this.lastID;
                        db.get("SELECT * FROM passwords WHERE id = ?",
                            [newId],
                            (err, row) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                } else {
                                    resolve(row)
                                }
                            }
                        )
                    }
                }
            )
        })
    }

    deletePassword(id, userId) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM passwords WHERE id=? and user_id=?", 
                [id, userId], (err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve("Успешно");
                    }
                }
            )
        })
    }

    updatePassword(id, user_id, site, login, password, iv, authTag) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE passwords SET site=?, login=?, password=?, iv=?, auth_tag=? WHERE id=? and user_id=?",
                [site, login, password, iv, authTag, id, user_id],
                (err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        db.get("SELECT * FROM passwords WHERE id = ? and user_id = ?", [id, user_id], 
                            (err, row) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                } else {
                                    resolve(row);
                                }
                            });
                    }
                }
            )
        })
    }
}

export default new Password();