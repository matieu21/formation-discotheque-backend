//Importation d'express et creation d'une constante pour la gestion de nos routes
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

//Creation de constantes pour appeler nos controlleurs avec require
const UserControllerClass = require('./Controller/UserController')
const ArtistControllerClass = require('./Controller/ArtistController')
const AlbumControllerClass = require('./Controller/AlbumController')
const TrackControllerClass = require ('./Controller/TrackController')

//Creation de nouveau objets en instanciant les Class des controlleurs
let UserController = new UserControllerClass
let ArtistController = new ArtistControllerClass
let AlbumController = new AlbumControllerClass
let TrackController = new TrackControllerClass



//Creation de nos routes avec en 1er argumant le chemin URl et le chemin d'appel des fonctions dans les class
app.get('/showAllUsers'     , UserController.all)
app.get('/showUser'         , UserController.show)
app.get('/inscription'      , UserController.insert)
app.get('/userLogin'        , UserController.login)
app.get('/userDelete'       , UserController.delete)

app.get('/showArtists'      , ArtistController.all)
app.get('/showArtistByName' , ArtistController.show)
app.post('/artistInsert'     , ArtistController.insert)

app.get('/showAlbums'       , AlbumController.all)
app.get('/showAlbumDetail'  , AlbumController.show)
app.get('/albumInsert'      , AlbumController.insert)

app.get('/getAlbumDetail'   , TrackController.all)
app.get('/tracksInsert'     , TrackController.insert)
app.get('/showTracksLyrics' , TrackController.lyrics)



app.listen(8082, () => {
    console.log("Serveur à l'écoute sur le port 8082")
  })