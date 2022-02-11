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
            const sql = 'SELECT lyrics_track from tracks where id_track = ?'
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

}
module.exports = TrackDAO