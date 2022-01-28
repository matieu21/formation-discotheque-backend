<?php
// --- SQL paramétré : VillesInsertCTRL.php
header("Content-Type: text/html; charset=UTF-8");

//Liste à remplir
$message = "";
$contentSelectAllArtists="";
//recuperation des données dans le select 
$artist= filter_input(INPUT_POST, "id_artist");
//recupere le fait que le bouton a été cliqué ou pas
$bt= filter_input(INPUT_POST, "bt");
    
    
try {
    //connexion à la DB
    $connexion = new PDO("mysql:host=127.0.0.1;port=3306;dbname=discotheque;", "web", "123");
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connexion->exec("SET NAMES 'UTF8'");

    // Exécution du SELECT SQL qui récupère toutes les infos (id et nom de l'artiste) depuis la table 'artists'
    $selectAll = "SELECT id_artist, name_artist FROM artists";
    // preparation et execution du SELECT SQL
    $cursor = $connexion->query($selectAll);
    $cursor->setFetchMode(PDO::FETCH_NUM);
  
    // On boucle sur les lignes en récupérant le contenu des colonnes 1 et 2 de notre table
    
    foreach ($cursor as $record) {
        // Récupération des valeurs par concaténation et interpolation
        $contentSelectAllArtists .= "<option value=\"$record[0]\">$record[1]</option>\n";
    }
    // Fermeture du curseur (facultatif)
    $cursor->closeCursor();
      
   // si le bouton est cliqué
    if ($bt != null) {  
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
    $connexion=null;   
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>artistDeleteViaListe.php</title>
    </head>

    <body>
        <form method='POST'>
            <label for="id_artist">Choose your artist :</label>
            <!--            La liste déroulante-->
            <select name="id_artist">
                <option value="0">--Artist-- ? </option>
<?php
// L'affichage des options de la liste déroulante
echo $contentSelectAllArtists;
?>
                <input type="submit" name='bt' value="Valider" />
            </select>
        </form>
<?php
    if (isset($message) && $message != "") {
        echo $message;
    }
    ?>
    </body>
</html>