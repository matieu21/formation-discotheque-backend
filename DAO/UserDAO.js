class UserDAO 
{
    selectAll(connexion) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM users'
                connexion.query(sql, (err, rows, fields) => {
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

login(connexion, [pseudo, password]){
    const query = (connexion)=>{
        return new Promise((resolve, reject)=>{
            const sql = ' SELECT * FROM users WHERE pseudo_user=? AND password_user=?'
            const params= [pseudo, password]
            connexion.query(sql, params, (err, rows, fields)=>{
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


    insertOne(connexion, [name_user, firstname_user, email_user, pseudo_user, password_user, role_user]){
        const query = (connexion)=>{
            return new Promise((resolve, reject )=>{
                const sql = 'INSERT INTO users (name_user, firstname_user, email_user, pseudo_user, password_user, role_user) VALUES(?,?,?,?,?,?)'
                const params = [name_user,firstname_user, email_user,pseudo_user, password_user, role_user]
                connexion.query(sql, params, (err, rows, fields)=>{
                    if (!err) {
                        
                        resolve(rows)
                      }else {
                
                        let array = []
                        array.push("Erreur d'exécution de la requête !" + err)
                        reject("Erreur d\'exécution de la requête ! " + err)
                      }
                })
            })
        }
        return query(connexion)
    }



}

module.exports = UserDAO