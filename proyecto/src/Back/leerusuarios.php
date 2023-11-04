<?php

include "conexion.php";
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$l_users = $data ['l_users'];

$l_users[0] = TRIM($l_users[0]);

$query = "SELECT * FROM usuarios WHERE";

$var3 = sizeof($l_users);

for ($i = 0; $i < $var3; $i++) {	
	if ( $i == 0 ) {
	    $query = $query . " username = '$l_users[$i]'";
	} else {
	    $query = $query . " or username = '$l_users[$i]'";
	}
}

$result = mysqli_query ($conexion, $query);
$usuarios = array();
while($row = mysqli_fetch_assoc($result)) {
    $usuarios[] = $row;
}
echo json_encode($usuarios);

?>
