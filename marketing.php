<?php
// CORS things..
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Request-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Always return JSON
header("Content-Type: application/json");

$file = file_get_contents('marketing.json');

if ($file == null || empty($file)) {
    header($_SERVER["SERVER_PROTOCOL"]." 500 Internal Server Error");
    exit('{"error":"Internal Server Error"}');
}

$json = json_decode($file);

if($json !== null) {
    echo json_encode($json);
} else {
    echo "[]";
}
?>

