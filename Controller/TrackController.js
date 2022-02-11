const connexion = require('../DAO/ConnexionDB')
const TrackDAOClass = require('../DAO/TrackDAO')
const TrackDTOClass = require('../DTO/Track')

let TrackDao = new TrackDAOClass


class TrackController {
    all(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        TrackDao.selectAll(connexion, req.query.id_album).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }

    lyrics(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        TrackDao.getLyrics(connexion, req.query.id_track).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }

    insert(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        let nameTrack = req.query.name_track
        let durationTrack = req.query.duration_track
        let authorTrack = req.query.author_track
        let lyricsTrack = req.query.lyrics_track
        let orderTrack = req.query.order_title_track
        let idAlbum = req.query.id_album
        let TrackDto = new TrackDTOClass(nameTrack, durationTrack, authorTrack, lyricsTrack, orderTrack, idAlbum)
        TrackDao.insert(connexion, TrackDto)
            .then(result => {
                res.status(200).json(result)
            }).catch(e => {
                res.status(200).json(e)
            })
        connexion.end
    }
}


module.exports = TrackController