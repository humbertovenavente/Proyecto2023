<?php
//conexion base de datos
$host = "gregserver";
$user = "root";
$password = "";
$dbname = "Proyecto";

$conexion = new mysqli ($host , $user , $password , $dbname);

header ("Access-Control-Allow-Origin: http://gregserver:3000");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

if ($conexion) {
    //echo "Conexion correcta";
}else {
    echo "No hubo conexion";
}






?>
