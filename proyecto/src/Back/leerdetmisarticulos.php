<?php
include "conexion.php";
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$id_art = $data ['id_art']; 

$id_articulo = intval($id_art);


$query = "SELECT * from top_mis_articulos where id_articulo = '$id_art'";
$result  = mysqli_query ($conexion , $query);
$article = array();
while($row = mysqli_fetch_assoc($result)) {
$article[] = $row;
}

$query_c  = "SELECT * from comentarios where id_articulo = '$id_art' order by nodo asc";
$result_c = mysqli_query ($conexion , $query_c);
$comment = array();
while($row = mysqli_fetch_assoc($result_c)) {
$comment[] = $row;
}

$datos = array();
$datos['articulo'] = $article;
$datos['comentarios'] = $comment;

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
