<?php
include "conexion.php";
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$id_art = $data ['id_art']; 

$id_articulo = intval($id_art);


$query = "SELECT * from top_articulos_mod where id_articulo = '$id_articulo'";
$result  = mysqli_query ($conexion , $query);
$article = array();
while($row = mysqli_fetch_assoc($result)) {
$article[] = $row;
}


$datos = array();
$datos = $article;

echo json_encode($datos);

//echo gettype($id_articulo);

//$sql2 = "CALL act_num_visitas( $id_articulo );";
//($conexion->query($sql2));


 $sql2 = "CALL act_num_visitas( $id_articulo );";
    if ($conexion->query($sql2) === TRUE) {
        // echo "Actualización de Num. de Visitas Exitoso";
    } else {
        // echo "Error al Actualizar Num. de Visitas:" . $conexion->error;
    } 


?>
