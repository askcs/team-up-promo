<?php
// CORS things..
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Request-Headers: Origin, X-Requested-With, Content-Type, Accept");


// Always return JSON
header("Content-Type: application/json");

$file = file_get_contents('storingen.json');

if ($file == null || empty($file)) {
        header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request");
        exit('{"error":"No source available. Contact system admin to fix it."}');
}

$json = json_decode($file);

if($file !== null){
        echo json_encode($json);
}
?>

