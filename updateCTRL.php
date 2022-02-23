<?php
// --- SQL paramétré : VillesInsertCTRL.php
header("Content-Type: text/html; charset=UTF-8");

//Listes à remplir
$message = "";
$contentSelectAllArtists = "";
$contentSelectAlbum="";
$modifArtist = "";
$artistName = "";
$artistWeb = "";
$modifAlbum = "";
$nameAlbum="";

//bt pour supprimer
$btDeleteArtist= filter_input(INPUT_POST, "btDeleteArtist");
$btDeleteAlbum= filter_input(INPUT_POST, "btDeleteAlbum");
// récupère le fait que les boutons ont été cliqués ou pas
$bt = filter_input(INPUT_POST, "bt");
$bt2= filter_input(INPUT_POST, "bt2");
$btModif = filter_input(INPUT_POST, "btModif");
$btModif2 = filter_input(INPUT_POST, "btModif2");

//recuperation des données dans l'input
$web = filter_input(INPUT_POST, "web");
$name = filter_input(INPUT_POST, 'name');
$artist = filter_input(INPUT_POST, "id_artist");
$photo = filter_input(INPUT_POST, "photo");


$album = filter_input(INPUT_POST, "id_album");
$nameAlbum = filter_input(INPUT_POST, "nameAlbum");
$photoAlbum = filter_input(INPUT_POST, "photoAlbum");
$durationAlbum = filter_input(INPUT_POST, "durationAlbum");
$totalTracksAlbum = filter_input(INPUT_POST, "totalTracksAlbum");
$yearReleaseAlbum = filter_input(INPUT_POST, "yearReleaseAlbum");



$artistHidden = filter_input(INPUT_POST, 'artistHidden');
$albumHidden = filter_input(INPUT_POST, 'albumHidden');

try {
    /*
     * Connexion
     */
    $connexion = new PDO("mysql:host=127.0.0.1;port=3306;dbname=discotheque;", "web", "123");
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connexion->exec("SET NAMES 'UTF8'");

    // si le bouton est cliqué
    if ($bt != null) {
        /*
         * SUPPRESSION
         */
        $sql = "SELECT name_artist, site_web_artist, photo_artist FROM artists WHERE id_artist=$artist ";
        // compilation de l'ordre SQL (prepare)
        $statement = $connexion->prepare($sql);

        // exécution de la requête 
        $statement->execute();
        $record = $statement->fetch();

        $artistName = $record[0];
        $artistWeb = $record[1];
        $photoArtist= $record[2];
        $modifArtist = $artist;
        $statement->closeCursor();
    }

    if ($btModif != null) {
        /*
         * modif
         */
        // requete SQL
        $sql = "CALL artistUpdate(?,?,?,?)";
        // compilation de l'ordre SQL (prepare)

        $statement = $connexion->prepare($sql);
        //On binde en affectant les ?
        $statement->bindParam(1, $name, PDO::PARAM_STR);
        $statement->bindParam(2, $web, PDO::PARAM_STR);
        $statement->bindParam(3, $photo, PDO::PARAM_STR);
        $statement->bindParam(4, $artistHidden, PDO::PARAM_STR);

        $statement->execute();
        //récupere le nombre de ligne affectées (le nombre d'insertion faite)
        $message = $statement->rowcount() . " enregistrement(s) modifié(s)";
    }

    // Exécution du SELECT SQL qui récupère tous les produits (id et désignation)
    $selectAll = "SELECT id_artist, name_artist FROM artists ORDER BY name_artist";
    // QUERY
    $cursor = $connexion->query($selectAll);
    // curseur = tableau ordinal
    $cursor->setFetchMode(PDO::FETCH_NUM);

    // On boucle sur les lignes en récupérant le contenu des colonnes 1 et 2
    // curseur = tableau 2D , enr = tableau 1D
    foreach ($cursor as $record) {
        // Récupération des valeurs par concaténation et interpolation
        $contentSelectAllArtists .= "<option value=\"$record[0] \">$record[1]</option>\n";
    }



    // Fermeture du curseur (facultatif)
    $cursor->closeCursor();

// si le bouton est cliqué
    if ($btDeleteArtist != null) {  
         // SUPPRESSION avec l'ordre  SQL DELETE FROM
         // on supprime l'artiste selon son id
        $sql = "DELETE FROM artists WHERE id_artist = ?";
        // compilation de l'ordre SQL (prepare)
        $statement = $connexion->prepare($sql);
        // constante php de la classe PDO pour préciser le type (::= classe) (string dans notre ex)
        // bindparam affecte une valeur au "?"
        $statement->bindParam(1, $artist, PDO::PARAM_STR);

        // exécution de la requête 
        $statement->execute();
        // récupère le nb de lignes affectées
        $message = $statement->rowcount() . " enregistrement(s) supprimé(s)";
    }
}
// Gestion des erreurs
catch (PDOException $e) {
    $message = "Echec de l'exécution : " . $e->getMessage();
}
$connexion = null;


/////////////////////////////////Update Albums//////////////////////////////////////////////////////////
try {
    /*
     * Connexion
     */
    $connexion = new PDO("mysql:host=127.0.0.1;port=3306;dbname=discotheque;", "web", "123");
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connexion->exec("SET NAMES 'UTF8'");

    // si le bouton est cliqué
    if ($bt2 != null) {
        /*
         * SUPPRESSION
         */
        $sql = "SELECT name_album, photo_album, duration_album, total_tracks_album, year_release_album FROM albums WHERE id_album=$album ";
        // compilation de l'ordre SQL (prepare)
        $statement = $connexion->prepare($sql);

        // exécution de la requête 
        $statement->execute();
        $record = $statement->fetch();

        $nameAlbum = $record[0];
        $photoAlbum = $record[1];
        $durationAlbum= $record[2];
        $totalTracksAlbum= $record[3];
        $yearReleaseAlbum= $record[4];
        $modifAlbum = $album;
        $statement->closeCursor();
    }

    if ($btModif2 != null) {
        /*
         * modif
         */
        // requete SQL
        $sql = "UPDATE albums SET name_album = ?, photo_album= ?, duration_album=?, total_tracks_album=?, year_release_album=? WHERE id_album=?";
        // compilation de l'ordre SQL (prepare)

        $statement = $connexion->prepare($sql);
        //On binde en affectant les ?
        $statement->bindParam(1, $nameAlbum, PDO::PARAM_STR);
        $statement->bindParam(2, $photoAlbum, PDO::PARAM_STR);
        $statement->bindParam(3, $durationAlbum, PDO::PARAM_STR);
        $statement->bindParam(4, $totalTracksAlbum, PDO::PARAM_STR);
        $statement->bindParam(5, $yearReleaseAlbum, PDO::PARAM_STR);
        $statement->bindParam(6, $albumHidden, PDO::PARAM_STR);

        $statement->execute();
        //récupere le nombre de ligne affectées (le nombre d'insertion faite)
        $message = $statement->rowcount() . " enregistrement(s) modifié(s)";
    }

    // Exécution du SELECT SQL qui récupère tous les produits (id et désignation)
    $selectAll2 = "SELECT id_album, name_album FROM albums ORDER BY name_album";
    // QUERY
    $cursor2 = $connexion->query($selectAll2);
    // curseur = tableau ordinal
    $cursor2->setFetchMode(PDO::FETCH_NUM);

    // On boucle sur les lignes en récupérant le contenu des colonnes 1 et 2
    // curseur = tableau 2D , enr = tableau 1D
    foreach ($cursor2 as $record) {
        // Récupération des valeurs par concaténation et interpolation
        $contentSelectAllAlbums .= "<option value=\"$record[0] \">$record[1]</option>\n";
    }
    // Fermeture du curseur (facultatif)
    $cursor2->closeCursor();

// si le bouton est cliqué
if ($btDeleteAlbum != null) {  
    // SUPPRESSION avec l'ordre  SQL DELETE FROM
    // on supprime l'artiste selon son id
   $sql = "DELETE FROM albums WHERE id_album = ?";
   // compilation de l'ordre SQL (prepare)
   $statement = $connexion->prepare($sql);
   // constante php de la classe PDO pour préciser le type (::= classe) (string dans notre ex)
   // bindparam affecte une valeur au "?"
   $statement->bindParam(1, $artist, PDO::PARAM_STR);

   // exécution de la requête 
   $statement->execute();
   // récupère le nb de lignes affectées
   $message = $statement->rowcount() . " enregistrement(s) supprimé(s)";
}

}
// Gestion des erreurs
catch (PDOException $e) {
    $message = "Echec de l'exécution : " . $e->getMessage();
}
$connexion = null;






?>


<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
    <!-- CSS only
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <script src="../libs/react.development.js"></script>
    <script src="../libs/react-dom.development.js"></script>
    <script src="../libs/babel.min.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/disco.js"></script>
    <script src="../js/searchResult.js"></script>
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="../css/style.css" id="theme">
</head>

<body id="body_accueil">


<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Discotheque </a>
                        <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item text-light" href="disco.html">My Library</a></li>

                            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle text-light">Update</a>
                                <ul class="dropdown-menu bg-dark">
                                    <li><a class="dropdown-item text-light" href="updateCTRL.php">Update Artists</a>
                                    </li>
                                    <li><a class="dropdown-item text-light" href="updateCTRL.php">Update Albums</a></li>
                                    <li><a class="dropdown-item text-light" href="updateCTRL.php">Update Tracks</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="wantlist.html">Wantlist</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Insert </a>
                        <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item text-light " href="insert_artist.html">New Artist</a></li>
                            <li><a class="dropdown-item text-light " href="insert_album.html">New Album</a></li>

                            <li><a class="dropdown-item text-light " href="insert_tracks.html">New Track</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="authentification.html"><img src="../images/logout24.png" ></a>
                    </li>
                </ul>
                
            </div>
        </div>
    </nav>

<!------------------------------------------------------------------------->
<div class="justify-content-center col-3 row mt-5 mb-5 m-auto">
    <form method='POST' action="./updateCTRL.php">
        <label for="id_artist" class="text-light">Choose your artist :</label>
        <!--            La liste déroulante-->
        <select name="id_artist" class="form-select" aria-label="Default select example">
            <option value="0">--Artist-- ?</option>
            <?php
            // L'affichage des options de la liste déroulante
            echo $contentSelectAllArtists;
            ?>
           <input type="submit" class="btn btn-light" name='bt' value="Valider" />
        <input type="submit" class="btn btn-danger "   name='btDeleteArtist' value="Delete" />
        </select>
        
    </form>
    <br><br><br><br><br><br>
    <form method="POST" action="./updateCTRL.php">
        <label class="text-light">Artist Name</label>

        <input value='<?php echo $artistName ?>' name='name' type='text' class="form-control  bg-dark mb-1 text-light">

        <label class="text-light">URL Photo</label>

        <input value='<?php echo $photoArtist ?>' name='photo' type='text' class="form-control  bg-dark mb-1 text-light">
        
        <label class="text-light">Web Name</label>
        <input value='<?php echo $artistWeb ?>' name='web' type='text' class="form-control  bg-dark mb-1 text-light"><br><br>

        <!-- input caché qui nous permet de récuperer l'id_artist de la selection
            pour valider les modifications (j'imagine) -->
        <input type='hidden' value='<?php echo $modifArtist ?>' name='artistHidden'>


        <input type="submit" class="btn btn-success btn-light" name="btModif" value="modifier">
    </form>
    <?php
    if (isset($message) && $message != "") {
        echo $message;
    }
    ?>
</div>
<br><br><br><br><br><br>




<!---------------------------------------------------------------------------->





<div class="justify-content-center col-3 row mt-5 mb-5 m-auto">
    <form method='POST' action="./updateCTRL.php">
        
        <label for="id_album" class="text-light">Choose an album: <?php ?></label>
        <!--            La liste déroulante-->
        <select name="id_album" class="form-select" aria-label="Default select example">
            <option value="0">--Album-- ?</option>
            <?php
            // L'affichage des options de la liste déroulante
            echo $contentSelectAllAlbums;
            ?>
            <input type="submit" class="btn btn-light" name='bt2' value="Valider" />
            <input type="submit" class="btn btn-danger "   name='btDeleteAlbum' value="Delete" />
        </select>
    </form>
    <br><br><br><br><br><br>
    <form method="POST" action="./updateCTRL.php">
        <label class="text-light">Album Name</label>

        <input value='<?php echo $nameAlbum ?>' name='nameAlbum' type='text' class="form-control  bg-dark mb-1 text-light">

        <label class="text-light">URL Photo</label>

        <input value='<?php echo $photoAlbum ?>' name='photoAlbum' type='text' class="form-control  bg-dark mb-1 text-light">
        
        <label class="text-light">Duration Album</label>
        <input value='<?php echo $durationAlbum ?>' name='durationAlbum' type='text' class="form-control  bg-dark mb-1 text-light">
        <label class="text-light">Total Tracks Album</label>
        <input value='<?php echo $totalTracksAlbum ?>' name='totalTracksAlbum' type='text' class="form-control  bg-dark mb-1 text-light">
        <label class="text-light">Year Release Album</label>
        <input value='<?php echo $yearReleaseAlbum ?>' name='yearReleaseAlbum' type='text' class="form-control  bg-dark mb-1 text-light">
        

        <!-- input caché qui nous permet de récuperer l'id_artist de la selection
            pour valider les modifications (j'imagine) -->
        <input type='hidden' value=<?php echo $modifAlbum ?> name='albumHidden'>


        <input type="submit" class="btn btn-success btn-light" name="btModif2" value="modifier">
    </form>
    <?php
    if (isset($message) && $message != "") {
        echo $message;
    }
    ?>
</div>
</body>

</html>