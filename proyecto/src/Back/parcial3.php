<?php
//conexion base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "employees";

$conexion = new mysqli ($host , $user , $password , $dbname);

header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");
header ("Content-Type: application/json");

if ($conexion) {
    //echo "Conexion correcta";
    
    
    /*Un servicio REST que devuelva jsons, el cual permita enviar como parametro un texto de nombre  y retorne los departamentos correspondientes al gerente que en su nombre contenga el texto enviado como parametro listados alfabeticamente por nombre de departamento,  los departamentos a devolver estaran listados con los siguientes datos/ atributos: su codigo de departamento, nombre de departamento, nombre completo del manager actual del departamento y un URL que apunta hacia el servicio # 2 con lo necesario para su funcionamiento, usar este URL debera abrir el servicio#2 y devolver su respuesta.  En caso no seencuentre ningun departamento el json debera contener un atributo de busqueda_vacia con valor true.*/
    
    
   
    $query =  "SELECT * from dept_manager WHERE dept_no = 'd006'";
    
    $result = mysqli_query ($conexion , $query);

/*
     $query1 =    "SELECT dept_manager.dept_no       AS dept_no,
                         departments.dept_name      AS dept_name,
                         dept_manager.emp_no        AS emp_no
                 FROM dept_manager 
                 INNER JOIN departments ON dept_manager.emp_no = departments.emp_no
                 WHERE dept_manager.dept_no = 'd002'";

	$result1 = mysqli_query ($conexion , $query1);*/


/*Un servicio REST que devuelva jsons, el cual permita enviar como parametro un texto de codigo de departamento y retorne un listado de los empleados asignados actualmente a ese departamento con su codigo de departamento, nombre del departamento, nombre completo del empleado y  codigo de empleado, ordenado por codigo de empleado de mayor a menor. En caso no seencuentre ningun empleado el json debera contener un atributo de busqueda_vacia con valor true.*/

 	
 	/*$query2 = "SELECT departments.dept_no        AS dept_no,
                         departments.dept_name      AS dept_name,
                         dept_manager.emp_no        AS emp_no,
                         employees.first_name       AS first_name,
                         employees.last_name        AS last_name
                 FROM departments 
                 INNER JOIN dept_manager ON deparments.emp_no = dept_manager.emp_no
                 INNER JOIN employees ON dept_manager.emp_no = employees.emp_no
                 WHERE dept_manager.dept_no = 'd002'
                 ORDER BY departments.emp_no ASC";

	$result2 = mysqli_query ($conexion , $query2);*/


    $result = array();
    while($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
    }

    echo json_encode($result);


/*
    $resultado1 = array();
    while($row = mysqli_fetch_assoc($result1)) {
        $resultado1[] = $row;
    }

    echo json_encode($resultado1);*/
    
    
    /*
    $resultado2 = array();
    while($row = mysqli_fetch_assoc($result2)) {
        $resultado2[] = $row;
    }

    echo json_encode($resultado2);*/
    
    
}else {
    echo "No hubo conexion";
}

   





?>
