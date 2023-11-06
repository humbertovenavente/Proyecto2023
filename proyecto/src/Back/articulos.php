<?php
include "conexion.php";

header ("Content-Type: application/json");

$query = "SELECT * FROM articulos";

$result = mysqli_query ($conexion , $query);



$articles = array();
while($row = mysqli_fetch_assoc($result)) {
    $articles[] = $row;
}
echo json_encode($articles);

?>
