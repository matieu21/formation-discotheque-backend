<?php
// --- SQL paramétré : VillesInsertCTRL.php
header("Content-Type: text/html; charset=UTF-8");

//Listes à remplir
$message = "";
$contentSelectAllArtists = "";
$modifArtist = "";
$artistName = "";
$artistWeb = "";

// récupère le fait que les boutons ont été cliqués ou pas
$bt = filter_input(INPUT_POST, "bt");
$btModif = filter_input(INPUT_POST, "btModif");

//recuperation des données dans l'input
$web = filter_input(INPUT_POST, "web");
$name = filter_input(INPUT_POST, 'name');
$artist = filter_input(INPUT_POST, "id_artist");

$artistHidden = filter_input(INPUT_POST, 'artistHidden');

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
        $sql = "SELECT name_artist, site_web_artist FROM artists WHERE id_artist=$artist";
        // compilation de l'ordre SQL (prepare)
        $statement = $connexion->prepare($sql);

        // exécution de la requête 
        $statement->execute();
        $record = $statement->fetch();

        $artistName = $record[0];
        $artistWeb = $record[1];
        $modifArtist = $artist;
        $statement->closeCursor();
    }

    if ($btModif != null) {
        /*
         * modif
         */
        // requete SQL
        $sql = "UPDATE artists SET name_artist = ?, site_web_artist= ? WHERE id_artist=?";
        // compilation de l'ordre SQL (prepare)

        $statement = $connexion->prepare($sql);
        //On binde en affectant les ?
        $statement->bindParam(1, $name, PDO::PARAM_STR);
        $statement->bindParam(2, $web, PDO::PARAM_STR);
        $statement->bindParam(3, $artistHidden, PDO::PARAM_STR);

        $statement->execute();
        //récupere le nombre de ligne affectées (le nombre d'insertion faite)
        $message = $statement->rowcount() . " enregistrement(s) modifié(s)";
    }

    // Exécution du SELECT SQL qui récupère tous les produits (id et désignation)
    $selectAll = "SELECT id_artist, name_artist FROM artists";
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
}
// Gestion des erreurs
catch (PDOException $e) {
    $message = "Echec de l'exécution : " . $e->getMessage();
}
$connexion = null;
?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>artistUpdate.php</title>
    </head>

    <body>
        <form method='POST'>
            <label for="id_artist">Choose your artist :</label>
            <!--            La liste déroulante-->
            <select name="id_artist">
                <option value="0">--Artist-- ?</option>
<?php
// L'affichage des options de la liste déroulante
echo $contentSelectAllArtists;
?>
                <input type="submit" name='bt' value="Valider" />
            </select>
        </form>
        <form method="POST">
            <label>Artist Name</label>

            <input value='<?php echo $artistName ?>' name='name' type='text'>


            <label>Web Name</label>
            <input value='<?php echo $artistWeb ?>' name='web' type='text'>

            <!-- input caché qui nous permet de récuperer l'id_artist de la selection
            pour valider les modifications (j'imagine) -->
            <input type='hidden' value=<?php echo $modifArtist ?>  name='artistHidden'>


            <input   type="submit" name="btModif" value="modifier" >
        </form>
<?php
if (isSet($message) && $message != "") {
    echo $message;
}
?>

    </body>
</html>