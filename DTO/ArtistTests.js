const Artist = require ('./Artist')

let RNDM = new Artist(222, 'XXXXXX', 1998 , 'www.rndm.com', 'rndm.jpg')

console.log(RNDM.getId()+ " "+ RNDM.getName()+" "+ RNDM.getYears()+" " + RNDM.getSite()+" "+ RNDM.getPhoto());
RNDM.setId(222)
RNDM.setName("AAAAAA")
RNDM.setYears(1998)
RNDM.setSite('www.rndm.com')
RNDM.setPhoto('rndm.jpg')

console.log(RNDM.getName())