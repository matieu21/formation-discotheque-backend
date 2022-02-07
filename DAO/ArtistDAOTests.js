/*
 PaysDAOTests.js
 */

const Artist = require('../DTO/Artist')
const ArtistDAO = require('./ArtistDAO')

let RNDM = new Artist(109, 'XXX', 1998 , 'www.rndm.com', 'rndm.jpg')

console.log(RNDM.getId()+ " "+ RNDM.getName()+" "+ RNDM.getYears()+" " + RNDM.getSite()+" "+ RNDM.getPhoto());
RNDM.setId(109)
RNDM.setName("XXX")
RNDM.setYears(1998)
RNDM.setSite('www.rndm.com')
RNDM.setPhoto('rndm.jpg')



console.log("*** TEST DU DAO (SELECT ALL) ***")
/*
MAIN DU CALL DE LA PROMESSE
*/
let dao = new ArtistDAO()
console.log("ON SOLLICITE LA FONCTION SELECTALLPAYS")
let cursor = dao.selectAllArtist().then(result => {
    console.log("ALL ENR")
    console.log(result)
}).catch(e => {
    console.log("Erreur du catch du MAIN MAIN : " + e.sqlMessage)
})
// console.log("APRES L'OBTENTION DU RESULTAT DE L'EXEC DE LA FONCTION SELECTALL")

// console.log(cursor)

console.log("*** TEST DU DAO (INSERT) ***")

let rndm = new Artist(109, "XXX")
console.log(rndm.getId() + " " + rndm.getName())

let affected = dao.insert(rndm).then(result => {
    console.log("INSERT")
    console.log(result)
}).catch(e => {
    console.log("Erreur du catch du MAIN MAIN : " + e.sqlMessage)
})

