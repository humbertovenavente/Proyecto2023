<?php

include "conexion.php";
header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$username = $data['usuario'];

$fecha= date("Y-m-d");

$query = "SELECT * FROM usuarios WHERE username = '$username'";
$result = mysqli_query ($conexion , $query);
$usuario = array();
while($row = mysqli_fetch_assoc($result)) {
    $usuario[] = $row;
}

$query_o  = "SELECT * from ofertas where username = '$username' and activa = 0";
$result_o = mysqli_query ($conexion , $query_o);
$oferta = array();
while($row = mysqli_fetch_assoc($result_o)) {
    $oferta[] = $row;
}

$datos = array();
$datos['usuario'] = $usuario;
$datos['oferta'] = $oferta;

echo json_encode($datos);

?>




