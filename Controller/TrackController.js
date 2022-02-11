const connexion = require ('../DAO/ConnexionDB')
const TrackDAOClass = require('../DAO/TrackDAO')

let TrackDao = new TrackDAOClass


class TrackController{
    all(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') 

        TrackDao.selectAll(connexion, req.query.id_album).then(result =>{
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })

    }

    lyrics(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        TrackDao.getLyrics(connexion, req.query.id_track).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }

       
}




module.exports = TrackController