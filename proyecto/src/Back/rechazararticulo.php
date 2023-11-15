<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    include "conexion.php";
    header ("Content-Type: application/json");

    echo "llego";

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Insertar un nuevo registro
        $data = json_decode(file_get_contents('php://input'), true);
        $id_articulo = $data['id_articulo'];
        $mot_rechazo = $data['mot_rechazo'];
        $titulo = $data['titulo'];
        $correo = $data['correo'];

        $sql = "UPDATE articulos SET status = '2' , mot_rechazo = '$mot_rechazo' where id_articulo='$id_articulo'";
        echo $sql;
        
        if ($conexion->query($sql) === TRUE) {
            echo "Registro insertado exitosamente";

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

                $mail->Subject = 'Rechazo de Articulo';

                $mail->isHTML(true);                                  //Set email format to HTML

                $mensaje = '<!DOCTYPE html>
                            <html>
                            <body>
                            Estimado, tu artículo con el titulo: ' . $titulo . '
                            <br>
                            <h1>Está Rechazado</h1>
                            <br>
                            <h2>El motivo del Rechazo es: ' . $mot_rechazo . '</h2>
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


        } else {
            echo "Error al insertar el registro: " . $conexion->error;
        }
    }





?>
