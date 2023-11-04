<?php

include "conexion.php";
header ("Content-Type: application/json");

$query = "SELECT * FROM categorias";
$result = mysqli_query ($conexion , $query);
$categorias = array();
while($row = mysqli_fetch_assoc($result)) {
    $categorias[] = $row;
}
// echo json_encode($categorias);

$query2 = "SELECT * FROM subcategorias";
$result2 = mysqli_query ($conexion , $query2);
$subcategorias = array();
while($row = mysqli_fetch_assoc($result2)) {
    $subcategorias[] = $row;
}
// echo json_encode($subcategorias);

$datos = array();
$datos['categorias'] = $categorias;
$datos['subcategorias'] = $subcategorias;
echo json_encode($datos);

?>
