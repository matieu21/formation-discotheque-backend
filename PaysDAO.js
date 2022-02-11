/*
 PaysDAO.js
 */

// const mysql = require('mysql')

class PaysDAO {

    /*
    PROMESSE
    */
    /**
     * 
     * @returns 
     */
    selectAll = (connexion) => {

        const requete = (connexion) => {
            // let message = ""
            return new Promise((resolve, reject) => {
                // Exécute une requête SQL de type SELECT
                let sql = "SELECT * FROM pays"
                connexion.query(sql, (err, rows, fields) => {
                    // SI OK
                    if (!err) {
                        // console.log("\nLes lignes de la table :")
                        // console.log(rows)
                        // OBLIGATOIRE
                        resolve(rows)
                        //message = rows
                    }
                    // Si KO
                    else {
                        //console.log("\nErreur d\'exécution de la requête !" + err)
                        // OBLIGATOIRE
                        reject("Erreur d\'exécution de la requête ! " + err)
                        //message = "Erreur d\'exécution de la requête ! " + err
                    }
                })
            } /// return
            ) /// promise
        } /// function requete

        /*
        "MAIN" !!! DE LA PROMESSE
        */
        

        // const Connexion = require('./Connexion')
        // let connexion = new Connexion()
        // let cnx = connexion.connect()
        // console.log(cnx)

        let message = "avant"
        /*
        L'appel de la promesse
        */
        message = requete(connexion)

        // Du coup le then().catch() à coder dans l'appelant
        return message

    } /// selectAllPaysWithPromise


    /**
     * 
     * @param {*} pays 
     * @returns 
     */
    insert = (connexion, pays) => {
        console.log("Début insert")
        console.log(pays.getIdPays())
        console.log(pays.getNomPays())

        const requete = (cnx, pays) => {
            //let message = ""
            return new Promise((resolve, reject) => {
                // Exécute une requête SQL de type SELECT
                let sql = "INSERT INTO pays(id_pays, nom_pays) VALUES(?,?)"
                const params = new Array(pays.getIdPays(), pays.getNomPays());
                console.log("Dans la promesse")
                console.log(pays.getIdPays())
                console.log(pays.getNomPays())
                cnx.query(sql, params, function (err, result) {
                    // SI OK 
                    if (!err) {
                        console.log('Result : ', result); // ou  result.affectedRows
                        console.log('Result.affected : ', result.affectedRows); // ou  result.affectedRows
                        resolve(result.affectedRows)
                    }
                    // Si KO 
                    else {
                        console.log('Erreur d\'exécution ! \n' + err);
                        reject("Erreur d\'exécution de la requête ! " + err)
                    }
                })
            } /// return
            ) /// promise
        } /// function requete

        /*
        "MAIN" !!! DE LA PROMESSE
        */
        console.log("insertPaysWithPromise !")
        //Charge la bibliothèque mysql et crée un « objet »
        //const mysql = require("mysql")

        let message = "avant"
        console.log(message)
        /*
        L'appel de la promesse
        */
        //message = requete(cnx)
        /*
        L'appel de la promesse
        */
        message = requete(connexion, pays)
        //connexion.end()
        // Du coup le then().catch() à coder dans l'appelant
        return message

    } /// insert

} /// class PaysDAO

module.exports = PaysDAO

