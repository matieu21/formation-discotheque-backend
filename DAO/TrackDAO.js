class TrackDAO{

    selectAll(connexion, id){
        const query = (connexion)=>{
            return new Promise((resolve, reject)=>{
                const sql = 'SELECT * FROM tracks WHERE id_album = ? ORDER BY order_title_track'
                const params = [id]
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


    getLyrics(connexion, id){
        const query = (connexion)=>{
            return new Promise ((resolve, reject)=>{
                const sql = 'SELECT name_track, lyrics_track from tracks where id_track = ?'
                const params = [id]
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

    insert = (connexion, track) => {
        const query = (connexion)=>{
            return new Promise((resolve, reject)=>{
                let sql = 'CALL tracksInsert(?,?,?,?,?,?)'
                const params = new Array(track.getNameTrack(), track.getDurationTrack(), track.getAuthorTrack(), track.getLyricsTrack(), track.getOrderTrack(), track.getIdAlbum())
                connexion.query(sql, params, (err, result)=>{
                    if(!err){
                        resolve(result.affectedRows)
                    }else {
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            }) 
        }
            return query(connexion)
}


}
module.exports = TrackDAO