

const express= require('express')
const app= express()
const fs = require('fs')
const mysql = require('mysql')
const http = require('http')


// http://localhost:8082/
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send("pppppp")
})

// http://localhost:8082/showUsersSQL
app.get('/showUsersSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'web',
      password: '123',
      database: 'discotheque'
    })
  
    // Connexion à la BD
    connexion.connect()
    // Exécute une requête SQL de type SELECT
    connexion.query('SELECT * FROM users', (err, rows, fields) => {
      // SI OK
      if (!err) {
        console.log(rows)
        res.status(200).json(rows)
      }
      // Si KO
      else {
        console.log("\nErreur d'exécution de la requête !" + err)
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  })
  ///fin d'app.get('/showUsersSQL'





// http://localhost:8082/inscription?name_user=...&firstname_user=...&email_user=...&pesudo_user=...&password_user=...
// Vers du MySQL (Insert)
app.get('/inscription', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'web',
      password: '123',
      database: 'discotheque'
    })
  
    // Connexion à la BD
    connexion.connect()
    //recuperation des donnes envoyées via le formualaire client
    const params = [req.query.name_user, req.query.firstname_user, req.query.email_user, req.query.pseudo_user, req.query.password_user, 'user']
    // Exécute une requête SQL de type INSERT
    connexion.query('INSERT INTO users (name_user, firstname_user, email_user, pseudo_user, password_user, role_user) VALUES(?,?,?,?,?,?)', params, (err, affected) => {
      // SI OK
      if (!err) {
        console.log(affected)
        res.status(200).json(affected)
      }
      // Si KO
      else {
        console.log(affected)
        console.log("\nErreur d'exécution de la requête !" + err)
        let array = []
        array.push("Erreur d'exécution de la requête !" + err)
        res.status(200).json(array)
      }
    })
  
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  
  }) /// app.get('/villeInsertSQL',



 

// http://localhost:8082/userLoginSQL?pseudo_user=..&password_user=..
// 
// Vers du MySQL (Insert)
app.get('/userLoginSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'web',
      password: '123',
      database: 'discotheque'
    })
  
    // Connexion à la BD
    connexion.connect()
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
  
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  
  }) /// app.get('/villeInsertSQL'

  // http://localhost:8082/userSelectViaProcStockSQLGET?
// Vers du MySQL (Select)
app.get('/userSelectViaProcStockSQLGET', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'web',
      password: '123',
      database: 'discotheque'
    })
  
    // Connexion à la BD
    connexion.connect()
    
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
  
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  }) /// app.get('/villeInsertViaProcStockSQLGET',

// http://localhost:8082/userDeleteViaProcStockSQLGET?id_user=3
// Vers du MySQL (Insert)
app.get('/userDeleteViaProcStockSQLGET', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'web',
      password: '123',
      database: 'discotheque'
    })
  
    // Connexion à la BD
    connexion.connect()
    
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
  
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  }) /// app.get('/villeInsertViaProcStockSQLGE
  

// http://localhost:8082/userInsertViaProcStockSQLGET?name_user=John&firstname_user=Lennon&email_user=jl@free.fr&pseudo_user=Johnny&password_user=123&password2_user=123

// Vers du MySQL (Insert)
app.get('/userInsertViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
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

  // Déconnexion de la BD
  connexion.end() /// Déconnexion
}) /// app.get('/villeInsertViaProcStockSQLGET'



  // http://localhost:8082/artistInsertViaProcStockSQLGET?name_artist=Radiohead&years_start_artist=1992&years_end_artist=NULL&psite_web_artist=www.radiohead.com&photo_artist=https://images.radio-canada.ca/q_auto,w_960/v1/ici-info/16x9/radiohead-coffret-anniversaire-kid-a-amnesiac.jpg

// Vers du MySQL (Insert)
app.get('/artistInsertViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  const params = [req.query.name_artist, req.query.years_activity_artist, req.query.site_web_artist, req.query.photo_artist];
  // Exécute une requête SQL de type INSERT
  connexion.query('CALL artistInsert(?,?,?,?)', params, (err, affected) => {
    // SI OK
    if (!err) {
      res.status(200).json(affected.affectedRows)
    }
    else {
      res.status(200).json("Erreur d'exécution de la requête !" + err)
    }
  })

  // Déconnexion de la BD
  connexion.end() /// Déconnexion
}) /// app.get('/villeInsertViaProcStockSQLGET'

// http://localhost:8082/albumInsertViaProcStockSQLGET?name_album=OK&nbspComputer&photo_album=https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F715LZJ5qX0L._SL1200_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.fr%2FOK-Computer-Radiohead%2Fdp%2FB000002UJQ&tbnid=r-TjdkmjTpBKoM&vet=12ahUKEwjc7K244Pn0AhUE0YUKHZtRAx8QMygAegUIARCpAQ..i&docid=L4EXtijqVSFE_M&w=1200&h=1200&itg=1&q=ok%20computer&ved=2ahUKEwjc7K244Pn0AhUE0YUKHZtRAx8QMygAegUIARCpAQ&number_tracks_album=12&duration_album=43.22&similar_album=PabloHoney&year_release_album=1999&id_artist=5

// Vers du MySQL (Insert)
app.get('/albumInsertViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
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

  // Déconnexion de la BD
  connexion.end() /// Déconnexion
}) /// app.get('/villeInsertViaProcStockSQLGET'
// http://localhost:8082/tracksInsertViaProcStockSQLGET?name_track=Karma&nbspPolice&duration_track=4.33&author_track=radiohead&lyrics_track=Karma&nbspPolice,Areestthisgrils...&order_title_track=5&id_album=2

// Vers du MySQL (Insert)
app.get('/tracksInsertViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
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

  // Déconnexion de la BD
  connexion.end() /// Déconnexion
}) /// app.get('/villeInsertViaProcStockSQLGET'




// http://localhost:8082/artistSelectViaProcStockSQLGET?
// Vers du MySQL (Select)
app.get('/artistSelectViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  
  // Exécute une requête SQL de type INSERT
  connexion.query('CALL artistSelect()', (err, rows) => {
    // SI OK
    if (!err) {
      res.status(200).json(rows[0])
    }
    else {
      res.status(200).json("Erreur d'exécution de la requête !" + err)
    }
  })

  // Déconnexion de la BD
  connexion.end() /// Déconnexion
}) /// app.get('/villeInsertViaProcStockSQLGET',

// http://localhost:8082/artistDeleteViaProcStockSQLGET?id_user=3
// Vers du MySQL (Insert)
app.get('/artistDeleteViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  
  // Exécute une requête SQL avec la procedure DELETE
  let new_id_artist = [req.query.id_artist];
  connexion.query('CALL artistDelete(?)', (new_id_artist), (err, affected) => {
    // SI OK
    if (!err) {
      res.status(200).json(affected)
    }
    else {
      res.status(200).json("Erreur d'exécution de la requête !" + err)
    }
  })

  // Déconnexion de la BD
  connexion.end() /// Déconnexion
}) /// app.get('/villeInsertViaProcStockSQLGE

// http://localhost:8082/showArtistSQL?name_artist=U2
app.get('/showArtistSQL', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  const param = [req.query.name_artist]
  // Exécute une requête SQL de type SELECT
  connexion.query('SELECT * FROM artists WHERE name_artist = ?', param, (err, rows, fields) => {
    // SI OK
    if (!err) {
      console.log(rows)
      res.status(200).json(rows)
    }
    // Si KO
    else {
      console.log("\nErreur d'exécution de la requête !" + err)
      res.status(200).json("\nErreur d'exécution de la requête !" + err)
    }
  })
  // Déconnexion de la BD
  connexion.end() /// Déconnexion
})
///fin d'app.get('/showUsersSQL'

// http://localhost:8082/showAlbumSQLViaProcStockSQLGET?id_album=
app.get('/showAlbumSQLViaProcStockSQLGET', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  const param = [req.query.id_album]
  // Exécute une requête SQL de type SELECT
  connexion.query('SELECT * FROM albums WHERE id_album = ?', param, (err, rows, fields) => {
    // SI OK
    if (!err) {
      console.log(rows)
      res.status(200).json(rows)
    }
    // Si KO
    else {
      console.log("\nErreur d'exécution de la requête !" + err)
      res.status(200).json("\nErreur d'exécution de la requête !" + err)
    }
  })
  // Déconnexion de la BD
  connexion.end() /// Déconnexion
})
///fin d'app.get('/showUsersSQL'


// http://localhost:8082/showAlbumSQL
app.get('/showAlbumSQL', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  
  // Exécute une requête SQL de type SELECT
  connexion.query('SELECT * FROM albums ORDER BY name_album', (err, rows, fields) => {
    // SI OK
    if (!err) {
      console.log(rows)
      res.status(200).json(rows)
    }
    // Si KO
    else {
      console.log("\nErreur d'exécution de la requête !" + err)
      res.status(200).json("\nErreur d'exécution de la requête !" + err)
    }
  })
  // Déconnexion de la BD
  connexion.end() /// Déconnexion
})

//http://localhost:8082/showArtists
app.get('/showArtists', (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  const connexion = mysql.createConnection({
    host: 'localhost', 
    port:'3306', 
    user: 'web', 
    password: '123', 
    database: 'discotheque'
  })
  connexion.connect()

  connexion.query('SELECT * from artists ORDER BY name_artist', (err, rows, fields)=>{
    if(!err){
      console.log(rows)
      res.status(200).jsonp(rows)
    }
    else {
      console.log("\nErreur d'éxecution de la reqête !" +err)
      res.status(200).json("\nErreur d'éxecution de la reqête !" +err)
    }
  })
connexion.end()
})

//http://localhost:8082/showTracksByName?name_track=jungleland
app.get('/showTracksByName', (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  const connexion = mysql.createConnection({
    host: 'localhost', 
    port:'3306', 
    user: 'web', 
    password: '123', 
    database: 'discotheque'
  })
  connexion.connect()
  const param = [req.query.name_track]
  connexion.query('SELECT * from tracks where name_track = ?' ,param, (err, rows, fields)=>{
    if(!err){
      console.log(rows)
      res.status(200).jsonp(rows)
    }
    else {
      console.log("\nErreur d'éxecution de la reqête !" +err)
      res.status(200).json("\nErreur d'éxecution de la reqête !" +err)
    }
  })
connexion.end()
})

// http://localhost:8082/showAlbumDetail?id_artist=6
app.get('/showAlbumDetail', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  const param = [req.query.id_artist]
  // Exécute une requête SQL de type SELECT
  connexion.query('SELECT * FROM albums WHERE id_artist = ? ORDER BY year_release_album', param, (err, rows, fields) => {
    // SI OK
    if (!err) {
      console.log(rows)
      res.status(200).json(rows)
    }
    // Si KO
    else {
      console.log("\nErreur d'exécution de la requête !" + err)
      res.status(200).json("\nErreur d'exécution de la requête !" + err)
    }
  })
  // Déconnexion de la BD
  connexion.end() /// Déconnexion
})
///fin d'app.get('/showUsersSQL'

// http://localhost:8082/getAlbumDetail?id_album=17
app.get('/getAlbumDetail', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
  })

  // Connexion à la BD
  connexion.connect()
  const param = [req.query.id_album]
  // Exécute une requête SQL de type SELECT
  connexion.query('SELECT * FROM tracks WHERE id_album = ? ORDER BY order_title_track', param, (err, rows, fields) => {
    // SI OK
    if (!err) {
      console.log(rows)
      res.status(200).json(rows)
    }
    // Si KO
    else {
      console.log("\nErreur d'exécution de la requête !" + err)
      res.status(200).json("\nErreur d'exécution de la requête !" + err)
    }
  })
  // Déconnexion de la BD
  connexion.end() /// Déconnexion
})

//http://localhost:8082/showTracksLyrics?id_track=28
app.get('/showTracksLyrics', (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  const connexion = mysql.createConnection({
    host: 'localhost', 
    port:'3306', 
    user: 'web', 
    password: '123', 
    database: 'discotheque'
  })
  connexion.connect()
  const param = [req.query.id_track]
  connexion.query('SELECT * from tracks where id_track = ?' ,param, (err, rows, fields)=>{
    if(!err){
      console.log(rows)
      res.status(200).jsonp(rows)
    }
    else {
      console.log("\nErreur d'éxecution de la reqête !" +err)
      res.status(200).json("\nErreur d'éxecution de la reqête !" +err)
    }
  })
connexion.end()
})








///fin d'app.get('/showUsersSQL'
app.listen(8082, () => {
    console.log("Serveur à l'écoute sur le port 8082")
  })