<?php




include "conexion.php";
header ("Content-Type: application/json");

// Manejar las solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $fname = $data ['fname'];
    $lname = $data ['lname'];
    $username = $data ['username'];
    $email = $data ['email'];
    $password = $data ['password1'];
    
    // echo "paso 1";
    $sqlIU = "INSERT INTO usuario (nombre_usuario, apellido_usuario, username, email, password_usuario, rol) VALUES ('$fname', '$lname', '$username', '$email', '$password', '1')";
      
    // echo "paso 2";
    
    if ($conexion->query($sqlIU) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}


/*
include "conexion.php";
header ("Content-Type: application/json");

//header ("Access-Control-Allow-Methods: GET, POST");
//header ("Access-Control-Allow-Origin: *");
//header ("Access-Control-Allow-Headers: Content-Type");

echo "resgistro1";

/*
if (mysqli_connect_error()){
	echo mysqli_connect_error();
	exit();
}
else {
	$eData = file_get_contents("php://input");
	$dData = json_decode($eData, true);
	
	$fname = $dData ['fname'];
	$lname = $dData ['lname'];
	$username = $dData ['username'];
	$email = $dData ['email'];
	$password = $dData ['password1'];
	
	$result = "";
	
	if ($fname != "" and $lname != "" and $username != "" and $email != "" $password != ""){
	$sql = "INSERT INTO usuario (nombre_usuario, apellido_usuario, username, correo_usuario, contraseña_usuario) VALUES ('$fname', '$lname', '$username', '$email', '$password')";
	$res = mysqli_query($conexion, $sql);
	if ($res){
	$result = "Registro completado";
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
// Manejar las solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $fname = $data ['fname'];
    $lname = $data ['lname'];
    $username = $data ['username'];
    $email = $data ['email'];
    $password = $data ['password1'];
    
    echo "paso 1";
    $sqlIU = "INSERT INTO usuario (nombre_usuario, apellido_usuario, username, email, password_usuario) VALUES ('$fname', '$lname', '$username', '$email', '$password')";
    
    //$sql = "INSERT INTO articulos (titulo_articulo, contenido_articulo) VALUES ('$titulo', '$contenido')";
    
    echo "paso 2";
    
    if ($conexion->query($sqlIU) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}*/


?>
