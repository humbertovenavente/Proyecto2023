<?php

include "conexion.php";
header ("Content-Type: application/json");

$query = "SELECT * FROM usuarios";

$result = mysqli_query ($conexion , $query);

// sleep(3);

$usuario = array();
while($row = mysqli_fetch_assoc($result)) {
    $usuario[] = $row;
}
echo json_encode($usuario);

?>
