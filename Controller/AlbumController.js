const connexion = require('../DAO/ConnexionDB')
const AlbumDAOClass = require('../DAO/AlbumDAO')
const AlbumDTOClass = require('../DTO/Album')


let AlbumDao = new AlbumDAOClass


class AlbumController {
    all(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        AlbumDao.selectAll(connexion).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })

    }

    show(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        AlbumDao.selectOne(connexion, req.query.id_artist).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })

    }

    insert(req, res) {
        let nameAlbum = req.query.name_album
        let photoAlbum = req.query.photo_album
        let durationAlbum = req.query.duration_album
        let totalTracksAlbum = req.query.total_tracks_album
        let yearAlbum = req.query.year_release_album
        let idArtist = req.query.id_artist

        let AlbumDto = new AlbumDTOClass(nameAlbum, photoAlbum, durationAlbum, totalTracksAlbum, yearAlbum, idArtist)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        AlbumDao.insert(connexion, AlbumDto)
            .then(result => {
                res.status(200).json(result)
            }).catch(e => {
                res.status(200).json(e)
            })


        connexion.end


    }

}

module.exports = AlbumController