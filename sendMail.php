<?php

/*
$contactName = isset($_REQUEST['contactName'])?$_REQUEST['contactName']:"";
$contactEmail = isset($_REQUEST['contactEmail'])?$_REQUEST['contactEmail']:"";
$contactSubject = isset($_REQUEST['contactSubject'])?$_REQUEST['contactSubject']:"";
$contactMessage = isset($_REQUEST['message'])?$_REQUEST['message']:"";
*/

$toEmail = "contact@teamtelefoon.nl";

function sendMail() {
    global $toEmail;
    $replyAddress = $_GET['contactEmail'];
    $header =
        'FROM: webform@teamtelefoon.nl'."\r\n".
    	'Reply-To: '.$replyAddress . "\r\n".
    	'Return-Path: '.$replyAddress . "\r\n";

    //risky custom data
    $query = explode('&', $_SERVER['QUERY_STRING'] );
    $message = "";
    foreach($query AS $q )
    {
        $kv = explode('=', $q );
        $k = mysql_escape_string( $kv[0] );
        $v = mysql_escape_string( urldecode($kv[1] ) ); // somewhere endlines get lost
        $message .= $k.' = '.$v ."\n";
    }

    if( $message == '' )return "FALSE";


    if( isset($_GET['isDebug']) ) {
        $ret = mail("stefan@teamtelefoon.nl",  'sendMail form', $message, $header);
    }
    else {
    	$ret = mail($toEmail, 'contact-formulier', $message, $header);
    }


    $handle = fopen( '/tmp/mail.log', 'ab');
    fwrite( $handle, $message."\n".$header );
    fwrite( $handle, "\n\n" );
    fclose($handle);


    if( $ret ){
        return "TRUE";
    }else{
        return "FALSE";
    }


}

echo sendMail();

?>
