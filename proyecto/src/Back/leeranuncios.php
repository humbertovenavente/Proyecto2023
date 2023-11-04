<?php

include "conexion.php";
header ("Content-Type: application/json");

$query = "SELECT * FROM anuncios where activo = 'X'";

$result = mysqli_query ($conexion , $query);

// sleep(3);

$anuncios = array();
while($row = mysqli_fetch_assoc($result)) {
    $anuncios[] = $row;
}
echo json_encode($anuncios);

?>
