<?php

// include "conexion.php";
class Conexion {	
    public function getConexion(){
      $host = "localhost:3306"; //127.0.0.1 0 localhost
      $db = "Proyecto"; //base de datos de mysql
      $user = "root"; // usuario de mysql
      $password = ""; //contraseña de mysql   
   //conexion a la base datos utilizando pdo
    $db = new PDO("mysql:host=$host;dbname=$db;", $user, $password);   
     return $db;
   }   
   }

class Api{
    public function getImagenes($username){    
       $vector = array();
       $conexion = new Conexion();
       $db = $conexion->getConexion();
      //  echo $username;
      //  echo "-----------------------2222------";
       $sql = "SELECT * FROM user_imagen_perfil WHERE username=:username";
       $consulta = $db->prepare($sql);
       $consulta->bindParam(':username', $username);
       $consulta->execute();
       while($fila = $consulta->fetch()) {
           $vector[] = array(
             "username" => $fila['username'],
             "imagen" =>  base64_encode($fila['imagen']));
             }//fin del ciclo while     
       return $vector;
    }
        
    public function addImagen($username, $imagen){      
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      $sql = "INSERT INTO user_imagen_perfil (username, imagen) VALUES (:username,:imagen)";
      $consulta = $db->prepare($sql);
      $consulta->bindParam(':username', $username);
      $consulta->bindParam(':imagen', $imagen);
      $consulta->execute();    
      return '{"msg":"imagen agregada"}';
    }
    
    public function deleteImagen($username){      
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      $sql = "DELETE FROM user_imagen_perfil WHERE username=:username";
      $consulta = $db->prepare($sql);
      $consulta->bindParam(':username', $username); 
      $consulta->execute();    
      return '{"msg":"imagen eliminada"}';
    }    
    }

    
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    $username = $_REQUEST['username'];
    // echo $username;
    // echo "------------------------------";
    $vector = array();
    $api = new Api();
    $vector = $api->getImagenes($username);
    $json = json_encode($vector);
    echo $json;
}

if($method=="POST"){
    $json = null;
    $foto = (file_get_contents($_FILES['imagen']['tmp_name']));
    $username = $_POST['username'];
    $api = new Api();
    // echo $foto;
    $json = $api->addImagen($username,$foto);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $username = $_REQUEST['username'];
    $api = new Api();
    $json = $api->deleteImagen($username);
    echo $json;
}

?>