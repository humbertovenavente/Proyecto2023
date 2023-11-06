<?php

include "conexion.php";
header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");


$data = file_get_contents("php://input");
$data = json_decode($data, true);
	
// echo "1 **";
$email = $data ['email'];

$query = "SELECT * FROM usuario WHERE email = '$email'";

// echo $query;

// echo "*** 2";

$result = mysqli_query ($conexion , $query);

$correo = array();

while($row = mysqli_fetch_assoc($result)) {
    $correo[] = $row;
}
echo json_encode($correo);




?>
