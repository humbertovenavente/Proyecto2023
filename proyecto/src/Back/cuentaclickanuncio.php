<?php

    include "conexion.php";
    header ("Access-Control-Allow-Origin: *");
    header ("Content-Type: application/json");

    $data = file_get_contents("php://input");
    $data = json_decode($data, true);

    $id = $data ['id'];

    // $query = "SELECT * FROM usuario WHERE username = '$username' AND password_usuario = '$password'";
    $query = "CALL cuenta_click( '$id' );";

    $result = mysqli_query ($conexion , $query);

    if ($result) {
        echo "Registro insertado exitosamente";
        // $sql2 = "CALL cuenta_login( '$username' );";
    } else {
        echo "Error al contar el Click";
    }

?>