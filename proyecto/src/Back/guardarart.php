<?php

/*
echo "inicio";

//conexion base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "Proyecto";

$conexion = new mysqli ($host , $user , $password , $dbname);

header ("Access-Control-Allow-Origin: http://localhost:3000");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

echo "aqui";

if ($conexion) {
    echo "Conexion correcta";
}else {
    echo "No hubo conexion ";
}
*/


include "conexion.php";
header ("Content-Type: application/json");


// Manejar las solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $titulo = $data['titulo'];
    $contenido = $data['contenido'];
    
    echo "paso 1";
    $sql = "INSERT INTO articulos (titulo_articulo, contenido_articulo) VALUES ('$titulo', '$contenido')";
    
    //$sql = "INSERT INTO articulos (titulo_articulo, contenido_articulo) VALUES ('$titulo', '$contenido')";
    
    echo "paso 2";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
   }
}

?>