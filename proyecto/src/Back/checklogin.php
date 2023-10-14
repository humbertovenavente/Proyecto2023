<?php

include "conexion.php";
header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);

// echo "1 **";

$username = $data ['username'];
$password = $data ['password'];

$query = "SELECT * FROM usuario WHERE username = '$username' AND password_usuario = '$password'";

// echo $query;
// echo "*** 2";

$result = mysqli_query ($conexion , $query);

$usuario = array();

while($row = mysqli_fetch_assoc($result)) {
    $usuario[] = $row;
}
echo json_encode($usuario);

?>
