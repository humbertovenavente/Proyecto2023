<?php

include "conexion.php";
header ("Content-Type: application/json");

$query = "SELECT * FROM categorias";

$result = mysqli_query ($conexion , $query);

// sleep(3);

$categorias = array();
while($row = mysqli_fetch_assoc($result)) {
    $categorias[] = $row;
}
echo json_encode($categorias);

?>
