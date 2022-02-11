// import UserController from './CTRL/UserController'

const express= require('express')
const app= express()
const mysql = require('mysql')
const connexion = require("./DAO/ConnexionDB")

const UserControllerClass = require('./Controller/UserController')
const ArtistControllerClass = require('./Controller/ArtistController')
const AlbumControllerClass = require('./Controller/AlbumController')
const TrackControllerClass = require ('./Controller/TrackController')

let UserController = new UserControllerClass
let ArtistController = new ArtistControllerClass
let AlbumController = new AlbumControllerClass
let TrackController = new TrackControllerClass





app.get('/showUsersSQL'     , UserController.all)
app.get('/showUser'         , UserController.show)
app.get('/showArtists'      , ArtistController.all)
app.get('/showArtistByName' , ArtistController.show)
app.get('/showAlbums'       , AlbumController.all)
app.get('/showAlbumDetail'  , AlbumController.show)
app.get('/getAlbumDetail'   , TrackController.all)
app.get('/showTracksLyrics' , TrackController.lyrics)
app.get('/artistInsert'     , ArtistController.insert)

// http://localhost:8082/inscription?name_user=...&firstname_user=...&email_user=...&pesudo_user=...&password_user=...
app.post('/inscription', UserController.insert)


// http://localhost:8082/userLogin?pseudo_user=..&password_user=..
// 
// Vers du MySQL (Insert)
app.get('/userLogin', UserController.login)
/* (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
   
    //recuperation des donnes envoyées via le formualaire client
    const params = [req.query.pseudo_user, req.query.password_user]
    // Exécute une requête SQL de type INSERT
    connexion.query(' SELECT * FROM users WHERE pseudo_user=? AND password_user=?', params, (err, rows) => {
      // SI OK
      if (!err) {
        console.log(rows)
       let message=""
        if (rows.length == 1) {
         
          message = "Vous êtes connecté(e)"
        } else {
          message = "Identifiant/Password non valide"
          console.log("")
        }
        console.log(message)
        res.status(200).json(message)
      }
      // Si KO
      else {
        
        console.log("\nErreur d'exécution de la requête !" + err)
        
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
  
    
  }) *//// app.get('/villeInsertSQL'

  // http://localhost:8082/userSelectViaProcStockSQLGET?
// Vers du MySQL (Select)
app.get('/userSelectViaProcStockSQLGET', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
   
    
    // Exécute une requête SQL de type INSERT
    connexion.query('CALL userSelect()', (err, rows) => {
      // SI OK
      if (!err) {
        res.status(200).json(rows[0])
      }
      else {
        res.status(200).json("Erreur d'exécution de la requête !" + err)
      }
    })
  
    
  }) /// app.get('/villeInsertViaProcStockSQLGET',

// http://localhost:8082/userDeleteViaProcStockSQLGET?id_user=3
app.get('/userDeleteViaProcStockSQLGET', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    
    
    // Exécute une requête SQL avec la procedure DELETE
    let new_id_user = [req.query.id_user];
    connexion.query('CALL userDelete(?)', (new_id_user), (err, affected) => {
      // SI OK
      if (!err) {
        res.status(200).json(affected)
      }
      else {
        res.status(200).json("Erreur d'exécution de la requête !" + err)
      }
    })
  
    
  }) /// app.get('/villeInsertViaProcStockSQLGE
  

// http://localhost:8082/userInsertViaProcStockSQLGET?name_user=John&firstname_user=Lennon&email_user=jl@free.fr&pseudo_user=Johnny&password_user=123&password2_user=123

// Vers du MySQL (Insert)
app.get('/userInsertViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  
  const params = [req.query.name_user, req.query.firstname_user, req.query.email_user, req.query.pseudo_user, req.query.password_user, req.query.password2_user];
  // Exécute une requête SQL de type INSERT
  connexion.query('CALL userInsert(?,?,?,?,?,?)', params, (err, affected) => {
    // SI OK
    if (!err) {
      res.status(200).json(affected.affectedRows)
    }
    else {
      res.status(200).json("Erreur d'exécution de la requête !" + err)
    }
  })

 
}) /// app.get('/userInsertViaProcStockSQLGET'



  

  


// http://localhost:8082/albumInsert?name_album=OK&nbspComputer&photo_album=https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F715LZJ5qX0L._SL1200_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.fr%2FOK-Computer-Radiohead%2Fdp%2FB000002UJQ&tbnid=r-TjdkmjTpBKoM&vet=12ahUKEwjc7K244Pn0AhUE0YUKHZtRAx8QMygAegUIARCpAQ..i&docid=L4EXtijqVSFE_M&w=1200&h=1200&itg=1&q=ok%20computer&ved=2ahUKEwjc7K244Pn0AhUE0YUKHZtRAx8QMygAegUIARCpAQ&number_tracks_album=12&duration_album=43.22&year_release_album=1999&id_artist=5

// Vers du MySQL (Insert)
app.get('/albumInsert', AlbumController.insert)


/*(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  
  const params = [req.query.name_album, req.query.photo_album,
     req.query.duration_album, req.query.total_tracks_album, req.query.year_release_album, req.query.id_artist];
  // Exécute une requête SQL de type INSERT
  connexion.query('CALL albumInsert(?,?,?,?,?,?)', params, (err, affected) => {
    // SI OK
    if (!err) {
      res.status(200).json(affected.affectedRows)
    }
    else {
      res.status(200).json("Erreur d'exécution de la requête !" + err)
    }
  })

}) */// app.get('/albumInsert')



// http://localhost:8082/tracksInsert?name_track=Karma&nbspPolice&duration_track=4.33&author_track=radiohead&lyrics_track=Karma&nbspPolice,Areestthisgrils...&order_title_track=5&id_album=2
app.get('/tracksInsert', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

 
  const params = [req.query.name_track, req.query.duration_track, req.query.author_track, req.query.lyrics_track, req.query.order_title_track, req.query.id_album];
  // Exécute une requête SQL de type INSERT
  connexion.query('CALL tracksInsert(?,?,?,?,?,?)', params, (err, affected) => {
    // SI OK
    if (!err) {
      res.status(200).json(affected.affectedRows)
    }
    else {
      res.status(200).json("Erreur d'exécution de la requête !" + err)
    }
  })

}) /// app.get('/villeInsertViaProcStockSQLGET'




 




app.listen(8082, () => {
    console.log("Serveur à l'écoute sur le port 8082")
  })