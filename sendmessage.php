<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

        //exit script outputting json data
        $response = json_encode(
                array(
                    'response' => 'ERROR',
                    'error' => 'Request must come from Ajax'
        ));
    
        die($response);
    }

    $client_name = $_POST['name'];
    $client_tel = $_POST['tel'];
    $client_email = $_POST['email'];
    $client_type = $_POST['type'];
    $client_message = $_POST['message'];

    $response = array();

    $to = 'info@gartenpark-korneuburg.at,investoren@gartenpark-korneuburg.at,aerzte@gartenpark-korneuburg.at,mieter@gartenpark-korneuburg.at,komfortfertig@gartenpark-korneuburg.at';

    $message = '';
    $site_base = $_SERVER[HTTP_HOST];
    $site_base = preg_replace('#^https?://#', '', $site_base);
    $from = 'info@'.$site_base;

    $subject = 'Bewerbung über Kontaktformular';
    $sender = 'From: Gartenpark <'.$from.
    '>'.
    "\r\n";

    $message.= '<p><b>Name: </b> '.$client_name.
    '</p>';
    $message.= '<p><b>Tel. : </b> '.$client_tel.
    '</p>';
    $message.= '<p><b>E-mail: </b> '.$client_email.
    '</p>';
    $message.= '<p><b>Type: </b> '.$client_type.
    '</p>';

    if ($_POST['message']) {
        $message.= '<p><b>Message: </b> '.$client_message.
        '</p>';
    }

    $headers = 'MIME-Version: 1.0'."\r\n";
    $headers.= 'Content-type: text/html; charset=UTF-8'."\r\n";
    $headers.= "X-Mailer: ". phpversion() ." \r\n";
    $headers.= $sender;

    $mail = mail($to, $subject, $message, $headers);

    if ($mail) {
        $response['response'] = 'SUCCESS';
    } else {
        $response['response'] = 'ERROR';
        $response['error'] = $mail;
    }

    $response = json_encode($response);
}

die($response);