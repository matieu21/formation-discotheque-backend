class UserDAO {
    selectAll(connexion) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = 'CALL userSelect()'
                connexion.query(sql, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows[0])
                    } else {
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            })
        }
        return query(connexion)
    }

    selectOne(connexion, id) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM users WHERE id_user = ?'
                const params = [id]
                connexion.query(sql, params, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows)
                    } else {
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            })
        }
        return query(connexion)
    }

    login(connexion, user) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = ' SELECT * FROM users WHERE pseudo_user=? AND password_user=?'
                const params = [user.getPseudoUser(), user.getPasswordUser()]
                connexion.query(sql, params, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows)
                    } else {
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            })
        }
        return query(connexion)
    }


    insert = (connexion, user) => {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                let sql = 'INSERT INTO users (name_user, firstname_user, email_user, pseudo_user, password_user, password2_user) VALUES(?,?,?,?,?,?)'
                const params = new Array(user.getNameUser(), user.getFirstnameUser(), user.getEmailUser(), user.getPseudoUser(), user.getPasswordUser(), user.getPassword2User())
                connexion.query(sql, params, (err, result) => {
                    if (!err) {
                        resolve(result.affectedRows)
                    } else {
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            })
        }
        return query(connexion)
    }

    delete = (connexion, id) => {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                let sql = 'CALL userDelete(?)'
                const params = [id]
                connexion.query(sql, params, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows)
                    } else {
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            })
        }
        return query(connexion)
    }


}

module.exports = UserDAO