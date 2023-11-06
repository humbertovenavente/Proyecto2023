<?php

include "conexion.php";

//header ("Access-Control-Allow-Origin: http://gregserver:3000");
//header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");
header ("Content-Type: application/json");

if ($conexion) {
    echo "Conexion correcta";

    $data = file_get_contents("php://input");
    $data = json_decode($data, true);

    $correo   = $data ['correo'];
    $nombre   = $data ['nombre'];
    $porcen   = $data ['porcen'];
    $fecini   = $data ['fecini'];
    $fecfin   = $data ['fecfin'];
    $username = $data ['username'];
    
//    $fecha_ini = date("Y-m-d");
//    $fecha_ini = $fecini;
    
//    echo $fecini;
//    echo gettype($fecha_ini);
//    echo $fecini;
//    echo $fecha_ini;

	$timeini = strtotime($fecini);
	$newformatini = date('Y-m-d',$timeini);    
	$timefin = strtotime($fecfin);
	$newformatfin = date('Y-m-d',$timefin); 
	$porcenint = intval($porcen);

    $sql = "CALL graba_oferta( '$username', $porcenint, '$newformatini', '$newformatfin');";


    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al grabar la oferta: " . $conexion->error;
    }


}else {
    echo "No hubo conexion ";
}


    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();                                            //Send using SMTP
        $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

        $mail->SMTPOptions = array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
            );

        $mail->Username   = 'josegregoriocoronelcolombo@gmail.com';                     //SMTP username
        $mail->Password   = 'ijmi znci qnbs ecsi';                               //SMTP password

        $mail->setFrom('josegregoriocoronelcolombo@gmail.com', 'Gregorio');

        $mail->addAddress($correo);     //Add a recipient

        $mail->Subject = 'Oferta de Suscripcion';

        $mail->isHTML(true);                                  //Set email format to HTML

        $mensaje = '<!DOCTYPE html>
                    <html>
                    <body>
                    Estimado ' . $nombre . ', tienes una oferta para una suscripcion en nuestra Web
                    <br>
                    <h1>El descuento es por: ' . $porcen . ' %</h1>
                    <br>
                    <h2>Valido desde el dia: ' . $fecini . ' hasta el dia ' . $fecfin . '</h2>
                    </body>
                    </html>
                    '; 

        $mail->Body = $mensaje;      
        // $mail->Body    = 'Estimado ' . $nombre . ', tiene una oferta para una suscripcion' . PHP_EOL . 
        //                  'El descuento es por: ' . $porcen . ' %';
        $mail->AltBody = 'Contenido';

        $mail->send();
        echo 'Message has been sent';        

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

?>
