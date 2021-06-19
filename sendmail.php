<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';


//Server settings
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
$mail->isSMTP();                                            //Send using SMTP
$mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
$mail->SMTPSecure = 'tls';         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
$mail->SMTPAuth = true;                                   //Enable SMTP authentication
$mail->Username = 'webdevafter30@gmail.com';                     //SMTP username
$mail->Password = '16nick04';                               //SMTP password
$mail->Port = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

//От кого письмо
$mail->setFrom('webdevafter30@gmail.com', 'Заказчик');
//Кому отправка
$mail->addAddress('webdevafter30@gmail.com');
//Тема отправляемого сообщения
$mail->Subject = 'Повiдомлення вiд ' . $_POST['name'] . '';


//Тело отправляемого сообщения
$body = '<h1>Вот еще заказик подъехал!</h1>';


//Проверка пустых полей
if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>ПІБ замовника:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['tel']))) {
    $body .= '<p><strong>Номер замовника:</strong> ' . $_POST['tel'] . '</p>';
}
if (trim(!empty($_POST['city']))) {
    $body .= '<p><strong>Мiсто:</strong> ' . $_POST['city'] . '</p>';
}
if (trim(!empty($_POST['numberOfNewMail']))) {
    $body .= '<p><strong>Номер відділення НП:</strong> ' . $_POST['numberOfNewMail'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Повiдомлення:</strong> ' . $_POST['message'] . '</p>';
}
if (trim(!empty($_POST['order-message']))) {
    $body .= '<p><strong><br></strong> ' . $_POST['order-message'] . '</p>';
}

$mail->Body = $body;


//Отправляем
if (!$mail->send()) {
    $message = 'Якась помилка, спробуйте ще раз (О_о)';
} else {
    $message = 'Дякую! Повідомлення надіслано.';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

// $mail->smtpClose();