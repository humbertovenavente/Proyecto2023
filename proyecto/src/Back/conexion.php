<?php

//conexion base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "Proyecto";

$conn = new mysqli ($host , $user , $password , $dbname);

header ("Access-Control-Allow-Origin: http://localhost:3000");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

if ($conn) {
    //echo "Conexion correcta";
}else {
    echo "No hubo conexion ";
}

?>