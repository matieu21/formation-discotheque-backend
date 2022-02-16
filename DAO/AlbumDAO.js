

class AlbumDAO {

    selectAll(connexion) {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * from albums ORDER BY name_album'
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
                const sql = 'SELECT * FROM albums WHERE id_artist = ? ORDER BY year_release_album'
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

    insert = (connexion, album) => {
        const query = (connexion) => {
            return new Promise((resolve, reject) => {
                let sql = "CALL albumInsert(?,?,?,?,?,?)"
                const params = new Array(album.getNameAlbum(), album.getPhotoAlbum(), album.getDurationAlbum(), album.getTotalTracksAlbum(), album.getYearAlbum(), album.getIdArtist())
                connexion.query(sql, params, (err, result) => {
                    if (!err) {
                        resolve(result.affectedRows)
                    } else {
                        console.log('Erreur d\'exécution ! \n' + err)
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            })

        }
        return query(connexion)
    }

}

module.exports = AlbumDAO