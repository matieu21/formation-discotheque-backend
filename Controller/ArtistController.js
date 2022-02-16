const connexion = require('../DAO/ConnexionDB')
const ArtistDAOClass = require('../DAO/ArtistDAO')
const ArtistDTOClass = require('../DTO/Artist')



let ArtistDao = new ArtistDAOClass



class ArtistController {

    all(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

        ArtistDao.selectAll(connexion).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
        connexion.end
    }

    show(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
        ArtistDao.selectOne(connexion, req.query.name_artist).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
        connexion.end
    }

    insert(req, res) {
        let nameArtist = req.query.name_artist
        let siteWebArtist = req.query.site_web_artist
        let photoArtist = req.query.photo_artist
        let ArtistDto = new ArtistDTOClass(nameArtist, siteWebArtist, photoArtist)
        console.log(req)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ArtistDao.insert(connexion, ArtistDto)
            .then(result => {
                res.status(200).json(result)
            }).catch(e => {
                res.status(200).json(e)
            })
        connexion.end
    }


}

module.exports = ArtistController