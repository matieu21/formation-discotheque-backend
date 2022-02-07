/*
 PaysDAO.js
 */

const mysql = require('mysql')

class ArtistDAO {

    /*
    PROMESSE
    */
    /**
     * 
     * @returns 
     */
    selectAllArtist = () => {

        const requete = (cnx) => {
            let message = ""
            return new Promise((resolve, reject) => {
                // Exécute une requête SQL de type SELECT
                let sql = "SELECT * FROM artists"
                cnx.query(sql, (err, rows, fields) => {
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
        console.log("selectAllArtist !")
        // Charge la bibliothèque mysql et crée un « objet »
        const mysql = require("mysql")

        // Crée un objet de type Connection
        const connexion = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "web",
            password: "123",
            database: "discotheque"
        })

        // Connexion à la BD
        connexion.connect()
        let message = "avant"
        /*
        L'appel de la promesse
        */
        message = requete(connexion)
        connexion.end()
        // Du coup le then().catch() à coder dans l'appelant
        return message

    } /// selectAllPaysWithPromise


    /**
     * 
     * @param {*} pays 
     * @returns 
     */
    insert = (artist) => {
        console.log("Début insert")
        console.log(artist.getId())
        console.log(artist.getName())
        const requete = (cnx, artist) => {
            let message = ""
            return new Promise((resolve, reject) => {
                // Exécute une requête SQL de type SELECT
                let sql = "INSERT INTO artists(id_artist, name_artist) VALUES(?,?)"
                const params = new Array(artist.getId(), artist.getName());
                console.log("Dans la promesse")
                console.log(artist.getId())
                console.log(artist.getName())
                cnx.query(sql, params, function (err, result) {
                    // SI OK 
                    if (!err) {
                        console.log('Result : ', result); // ou  result.affectedRows
                        console.log('Result.affecteed : ', result.affectedRows); // ou  result.affectedRows
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
        console.log("insertArtistWithPromise !")
        // Charge la bibliothèque mysql et crée un « objet »
        const mysql = require("mysql")

        // Crée un objet de type Connection
        const connexion = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "web",
            password: "123",
            database: "discotheque"
        })

        // Connexion à la BD
        connexion.connect()
        let message = "avant"
        /*
        L'appel de la promesse
        */
        message = requete(connexion, artist)
        connexion.end()
        // Du coup le then().catch() à coder dans l'appelant
        return message

    } /// insert

} /// class PaysDAO

module.exports = ArtistDAO

