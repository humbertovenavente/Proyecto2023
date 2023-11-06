<?php
//conexion base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "Proyecto";

$conexion = new mysqli ($host , $user , $password , $dbname);

header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

if ($conexion) {
    //echo "Conexion correcta";
}else {
    echo "No hubo conexion";
}






?>
