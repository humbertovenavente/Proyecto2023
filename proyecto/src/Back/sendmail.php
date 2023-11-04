<?php

header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");
header ("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$email = $data ['email'];
$fname = $data ['fname'];

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require 'vendor/autoload.php';

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {

    $mail->isSMTP();                                            //Send using SMTP
    $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    // $mail->Host       = 'smtp.titan.email';                     //Set the SMTP server to send through
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
    //Recipients
    $mail->setFrom('josegregoriocoronelcolombo@gmail.com', 'Gregorio');
    // $mail->addReplyTo('info@example.com', 'Information');

    $mail->addAddress($email, $fname);     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->Subject = 'Confirmacion de registro';

    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Body    = 'Su usuario se ha registrado correctamente';
    $mail->AltBody = 'Contenido no HTML';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
