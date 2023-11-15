<?php

include "conexion.php";
header ("Content-Type: application/json");

$query = "SELECT * FROM comentarios_vista where n_reportes <> 0 ORDER BY n_reportes DESC";

$result = mysqli_query ($conexion , $query);

// sleep(3);

$anuncio = array();
while($row = mysqli_fetch_assoc($result)) {
    $anuncio[] = $row;
}
echo json_encode($anuncio);

?>
