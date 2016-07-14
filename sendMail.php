<?php

/*
$contactName = isset($_REQUEST['contactName'])?$_REQUEST['contactName']:"";
$contactEmail = isset($_REQUEST['contactEmail'])?$_REQUEST['contactEmail']:"";
$contactSubject = isset($_REQUEST['contactSubject'])?$_REQUEST['contactSubject']:"";
$contactMessage = isset($_REQUEST['message'])?$_REQUEST['message']:"";
*/

$toEmail = "henk@teamtelefoon.nl";
//$toEmail = "mma@ask-cs.com";

$isDebug = true;

function sendMail() {
        global $toEmail;
        $header = "FROM: $contactEmail\r\n";

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

        global $isDebug;
        if( $isDebug)
        {
                mail("lvdinten@ask-cs.com", 'sendMail form', $message, $header);
        }

        if(mail($toEmail,'contact-formulier',$message,$header)){
                return "TRUE";
        }else{
                return "FALSE";
        }


}

echo sendMail();


$header = "FROM: noreply<no-replyt@icaweb.nl>\r\n";
$header.= "Return-Path: <no-reply@icaweb.nl>\r\n";
mail( 'henk@teamtelefoon.nl', 'hello', 'testbody',  $header );
?>