<?php

include "conexion.php";
header ("Content-Type: application/json");

$query = "SELECT * FROM anuncios ORDER BY num_clicks DESC";

$result = mysqli_query ($conexion , $query);

// sleep(3);

$anuncio = array();
while($row = mysqli_fetch_assoc($result)) {
    $anuncio[] = $row;
}
echo json_encode($anuncio);

?>
