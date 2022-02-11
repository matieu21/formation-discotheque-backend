const connexion = require("./../DAO/ConnexionDB")
const UserDaoClass = require('../DAO/UserDAO')


let UserDao = new UserDaoClass

class UserController 
{
    all(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        UserDao.selectAll(connexion).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }
    
    show(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        UserDao.selectOne(connexion, req.query.id_user).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }

    login(req,res){
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        UserDao.login(connexion, [req.query.pseudo_user, req.query.password_user]).then(result=>{
            res.status(200).json(result)
            
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }

    insert(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        UserDao.insertOne(connexion, [req.query.name_user, req.query.firstname_user, req.query.email_user, req.query.pseudo_user, req.query.password_user, 'user']).then(result=>{
            res.status(200).json(result)
        }).catch (e=>{
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }

}

module.exports = UserController