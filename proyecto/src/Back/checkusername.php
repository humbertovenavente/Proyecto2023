<?php


include "conexion.php";
header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");


$data = file_get_contents("php://input");
$data = json_decode($data, true);
	
// echo "1 **";
$username = $data ['username'];

$query = "SELECT * FROM usuario WHERE username = '$username'";

// echo $query;

// echo "*** 2";

$result = mysqli_query ($conexion , $query);

$usuario = array();

while($row = mysqli_fetch_assoc($result)) {
    $usuario[] = $row;
}
echo json_encode($usuario);

/*
header ("Access-Control-Allow-Methods: GET, POST");

header ("Access-Control-Allow-Headers: Content-Type");

if (msqli_connect_error()){
	echo mysqli_connect_error();
	exit();
}
else {
	$eData = file_get_contents("php://input");
	$dData = json_decode($eData, true);
	
	$username = $dData ['username'];
	
	$result = "";
	
	if ($username != ""){
	$sql = "SELECT * FROM username WHERE username = '$username'";
	$res = mysqli_query($conexion, $sql);
	if ($res){
	$result = "El usuario ya existe";
	}else {
		$result = "";
		}
	}
	else {
	
	$conexion -> close();
	$response [] = array ("result" => $result);
	echo json_encode($response);
	}
}*/


/*
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data ['username'];
    $result = "";
    
    echo "paso 1";
    $sqlDU = "SELECT * FROM username WHERE username = '$username'";
    
    $res = mysqli_query($conexion, $sqlDU);
	if ($res){
	$result = "El usuario ya existe";
	}else {
		$result = "";
		}
	}
	else {
	
	$conexion -> close();
	$response = ("result" => $result);
	echo json_encode($response);
	}*/
    
    
    /*
    if ($conexion->query($sqlDU) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}*/

/*
include "conexion.php";

header ("Content-Type: application/json");





$query = "SELECT * FROM usuario WHERE username = '$username'";

$result = mysqli_query ($conexion , $query);



$usuarios = array();
while($row = mysqli_fetch_assoc($result)) {
    $usuarios[] = $row;
}
echo json_encode($usuarios);*/



/*
include "conexion.php";
header ("Content-Type: application/json");


// Verificar la conexión
if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

// Consultar la base de datos para obtener los usuarios
$query = "SELECT * FROM usuario";
$result = $mysqli->query($query);

if (!$result) {
    die("Error en la consulta: " . $mysqli->error);
}

$usuarios = array();

// Obtener los datos de los usuarios
while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

// Cerrar la conexión a la base de datos
$mysqli->close();

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($usuarios);*/


/*
$data = file_get_contents("php://input");
$data = json_decode($data, true);
	
echo "paso 1";
$username = $data ['username'];

$query = "SELECT * FROM username WHERE username = '$username'";

$result = mysqli_query ($conexion , $query);

$usuario = "";

while($row = mysqli_fetch_assoc($usuario)) {
    $usuario = $row;
}
echo json_encode($usuario);*/

/*
header ("Access-Control-Allow-Methods: GET, POST");
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Headers: Content-Type");

if (msqli_connect_error()){
	echo mysqli_connect_error();
	exit();
}
else {
	$eData = file_get_contents("php://input");
	$dData = json_decode($eData, true);
	
	$username = $dData ['username'];
	
	$result = "";
	
	if ($username != ""){
	$sql = "SELECT * FROM username WHERE username = '$username'";
	$res = mysqli_query($conexion, $sql);
	if ($res){
	$result = "El usuario ya existe";
	}else {
		$result = "";
		}
	}
	else {
	
	$conexion -> close();
	$response [] = array ("result" => $result);
	echo json_encode($response);
	}
}*/


/*
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data ['username'];
    $result = "";
    
    echo "paso 1";
    $sqlDU = "SELECT * FROM username WHERE username = '$username'";
    
    $res = mysqli_query($conexion, $sqlDU);
	if ($res){
	$result = "El usuario ya existe";
	}else {
		$result = "";
		}
	}
	else {
	
	$conexion -> close();
	$response = ("result" => $result);
	echo json_encode($response);
	}*/
    
    
    /*
    if ($conexion->query($sqlDU) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}*/






?>
