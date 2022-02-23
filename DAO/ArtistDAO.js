class ArtistDAO {
    selectAll(connexion) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * from artists ORDER BY name_artist'
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


    selectOne(connexion, name) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = 'CALL artistSelect(?)'
                const params = [name]
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


    insert = (connexion, artist) => {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                let sql = "CALL artistInsert(?,?,?)"

                const params = new Array(artist.getName(), artist.getSite(), artist.getPhoto())

                console.log(artist)

                connexion.query(sql, params, (err, result) => {
                    if (!err) {
                        console.log("result: ", result)
                        console.log('result affected:', result.affectedRows)
                        resolve(result.affectedRows)
                    } else {
                        console.log('Erreur d\'exécution ! \n' + err)
                        reject("Erreur d\'exécution de la requête ! PAF " + err)
                    }
                })
            })
        }
        return query(connexion)
    }

    update = (connexion, artist)=>{
        const query = (connexion)=>{
            return new Promise((resolve, reject)=>{
                let sql = "CALL artistUpdate(?,?,?,?)"
                const params = new Array(artist.setName(), artist.setSite(), artist.getPhoto(), artist.setId)
            })
        }
    }


}

module.exports = ArtistDAO