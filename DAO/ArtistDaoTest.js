const mysql = require("mysql")
const Artist = require('../DTO/Artist')
const ArtistDAO = require('./ArtistDAO')
const connexion = require('./ConnexionDB')


let ArtistDao = new ArtistDAO
//let artist = new Artist

let Joe = new Artist('oiuytr', 1999, 'www.fff.fr', 'ooo.jpf')

console.log(Joe.getName()+ Joe.getYears()+Joe.getSite()+Joe.getPhoto())

let dao = new ArtistDAO()
let affected = dao.insert(connexion, Joe).then(result => {
    console.log("Insert")
    console.log(result)
}).catch(e=>{
    console.log("Erreur du catch du TEST : " + e)
})

console.log('affected')
console.log(affected)



connexion.end