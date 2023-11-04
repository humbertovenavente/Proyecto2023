<?php

include "conexion.php";
header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);

$username = $data ['username'];
$password = $data ['password'];

$query = "SELECT * FROM usuario WHERE username = '$username' AND password_usuario = '$password'";

$result = mysqli_query ($conexion , $query);

if ($result) {
    // echo "Registro insertado exitosamente";
    $usuario = array();

    while($row = mysqli_fetch_assoc($result)) {
        $usuario[] = $row;
    }
    echo json_encode($usuario);

    $sql2 = "CALL cuenta_login( '$username' );";
    $result2 = mysqli_query ($conexion , $sql2);

} else {
    // echo "Error al grabar la oferta: " . $conexion->error;
}



?>