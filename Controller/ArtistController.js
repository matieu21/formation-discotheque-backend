const connexion = require('../DAO/ConnexionDB')
const ArtistDAOClass = require('../DAO/ArtistDAO')
const ArtistDTOClass = require('../DTO/Artist')



let ArtistDao = new ArtistDAOClass





class ArtistController {

    all(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        ArtistDao.selectAll(connexion).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
        connexion.end
    }

    show(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        ArtistDao.selectOne(connexion, req.query.name_artist).then(result => {
            res.status(200).json(result)
            
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
        connexion.end
    }

    insert(req, res) {
        let nameArtist = req.query.name_artist
        let ArtistDto = new ArtistDTOClass(nameArtist)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ArtistDao.insert(connexion, ArtistDto)
            .then(result => {
                console.log("Insert")
                console.log(result)
                res.status(200).json(result)
            }).catch(e => {
                console.log("Erreur du catch du TEST : " + e)
                res.status(200).json(e)
            })
        
      
            connexion.end

        
    }


  

}

module.exports = ArtistController