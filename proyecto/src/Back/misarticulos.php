<?php

    include "conexion.php";

header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");
    

$data = file_get_contents("php://input");
$data = json_decode($data, true);

$username = $data['usuario'];
                
    $query =    "SELECT * from top_mis_articulos where username = '$username'";

    $result = mysqli_query ($conexion , $query);

    $articles = array();
    while($row = mysqli_fetch_assoc($result)) {
        $articles[] = $row;
    }

    echo json_encode($articles);
?>
