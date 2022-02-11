const connexion = require("./../DAO/ConnexionDB")
const UserDaoClass = require('../DAO/UserDAO')
const UserDTOClass = require('../DTO/User')


let UserDao = new UserDaoClass

class UserController {
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

    login(req, res) {
        let pseudoUser = req.query.pseudo_user
        let passwordUser = req.query.password_user
        let UserDto = new UserDTOClass(pseudoUser, passwordUser)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        UserDao.login(connexion, UserDto).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json(e)
        })
    }

    insert(req, res) {
        let nameUser = req.query.name_user
        let firstnameUser = req.query.firstname_user
        let emailUser = req.query.email_user
        let pseudoUser = req.query.pseudo_user
        let passwordUser = req.query.password_user
        let passwor2dUser = req.query.password2_user
        let UserDto = new UserDTOClass(nameUser, firstnameUser, emailUser, pseudoUser, passwordUser, passwor2dUser)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        UserDao.insert(connexion, UserDto)
            .then(result => {
                res.status(200).json(result)
            }).catch(e => {
                res.status(200).json(e)
            })
        connexion.end
    }

    delete(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        let new_id_user = [req.query.id_user];
        UserDao.delete(connexion, new_id_user).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.status(200).json("\nErreur d'exécution de la requête !" + e.sqlMessage)
        })
    }


}

module.exports = UserController