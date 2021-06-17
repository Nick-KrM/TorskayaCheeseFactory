<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('style.jimbo@gmail.com', 'Заказчик');
//Кому отправка
$mail->addAddress('webdevafter30@gmail.com');
//Тема отправляемого сообщения
$mail->Subject = 'Заказ от ${номер телефона}';


//Тело отправляемого сообщения
$body = '<h1>Вот еще заказик подъехал!</h1>';


//Проверка пустых полей
if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Повiдомлення:</strong> ' . $_POST['messageы'] . '</p>';
}


$mail->Body = $body;


//Отправляем
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправленны!';
}

$response = ['message' => $message];

header('Country-type: application/json');
echo json_encode($response);
?>