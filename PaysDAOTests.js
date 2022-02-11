/*
 PaysDAOTests.js
 */
const mysql = require("mysql")
// const Connexion = require('./Connexion')
const Pays = require('../entities/Pays')
const PaysDAO = require('./PaysDAO')

// console.log("*** TEST DU DTO ***")
// let france = new Pays("FR", "France")
// console.log(france.getIdPays() + " " + france.getNomPays())
// france.setNomPays("Francia")
// console.log(france.getIdPays() + " " + france.getNomPays())

console.log("*** TEST DU DAO (SELECT ALL) ***")
/*
MAIN DU CALL DE LA PROMESSE
*/
let dao = new PaysDAO()
console.log("ON SOLLICITE LA FONCTION SELECTALLPAYS")

console.log("selectAll !")
// Charge la bibliothèque mysql et crée un « objet »


// Crée un objet de type Connection
const connexion = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "cours"
})

// Connexion à la BD
connexion.connect()

let cursor = dao.selectAll(connexion).then(result => {
    console.log("ALL ENR")
    console.log(result)
}).catch(e => {
    console.log("Erreur du catch du MAIN MAIN : " + e.sqlMessage)
})
// console.log("APRES L'OBTENTION DU RESULTAT DE L'EXEC DE LA FONCTION SELECTALL")

// console.log(cursor)

console.log("*** TEST DU DAO (INSERT) ***")

let bulgarie = new Pays("BG", "Bulgarie")
console.log(bulgarie.getIdPays() + " " + bulgarie.getNomPays())

let affected = dao.insert(connexion, bulgarie).then(result => {
    console.log("INSERT")
    console.log(result)
}).catch(e => {
    console.log("Erreur du catch du MAIN MAIN : " + e.sqlMessage)
})

/*
DECONNEXION
*/
connexion.end
