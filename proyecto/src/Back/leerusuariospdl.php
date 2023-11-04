<?php

include "conexion.php";
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$d_login = $data ['d_login'];

// echo gettype($d_login);

$query = "SELECT * FROM usuarios where diaslogin >= '$d_login'";

// echo $query;

$result = mysqli_query ($conexion , $query);

$usuarios = array();
while($row = mysqli_fetch_assoc($result)) {
    $usuarios[] = $row;
}
echo json_encode($usuarios);

?>
