<?php

// DESCRIPTION
// -----------
// 
// Returns an array of back-ends, based on the front-end and its buildnumber. The script expects the version numbers to be incremental and should always differ per OTAP stage.
// In the event the buildnumbers are the same, the script prefers to return back-ends in this order: production, demo, test.
// Passing a build number that is higher than the test stage, will return the urls for the development stage.
//
// CONFIGURATION
// -------------
// 
// This script requires a 'backends.json' file, where all available back-ends are listed per OTAP stage.
// An example file is included: backends-example.json
// 
// QUERY PARAMETERS
// ----------------
// 'frontend'		required	String	Which frontend we want a back-end url(s) for. One of: [android, ios, webapp] (case insensitive)
// 'buildnumber'	required	int	The buildnumber of the given frontend. Must be > 0.

// Stupid CORS things..
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS"); 
header("Access-Control-Allow-Headers: *");
header("Access-Control-Request-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Allowed values for the 'frontend' query parameter (keep lowercase, as the input will be strtolower()-ed)
$allowedFrontends = array('android', 'ios', 'webapp');

// Always return JSON
header("Content-Type: application/json");

if (!array_key_exists('frontend', $_GET)) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
	exit('{"error":"Missing query parameter \'frontend\'"}');
}

if (!array_key_exists('buildnumber', $_GET)) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
	exit('{"error":"Missing query parameter \'buildnumber\'"}');
}

$frontend = strtolower($_GET['frontend']);
$buildnumber = (int) $_GET['buildnumber'];

if ($frontend == null || !in_array($frontend, $allowedFrontends)) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
	exit('{"error":"Please provide (a valid value for) query parameter \'frontend\'"}');
}

if ($buildnumber == null || !is_int($buildnumber) || $buildnumber < 1) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
	exit('{"error":"Please provide an integer as build number, being higher higher than 0."}');
}

$file = file_get_contents('backends.json');

if ($file == null || empty($file)) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
	exit('{"error":"No source available. Contact system admin to fix it."}');
}

$json = json_decode($file);

$knownBuildnumbers = $json->$frontend;
$testBn = $knownBuildnumbers->test;
$demoBn = $knownBuildnumbers->demo;
$prodBn = $knownBuildnumbers->production;

if ($buildnumber > 0 && $buildnumber <= $prodBn) {
	echo json_encode($json->stage->production);
} elseif ($buildnumber > $prodBn && $buildnumber <= $demoBn) {
	echo json_encode($json->stage->demo);
} elseif ($buildnumber > $demoBn && $buildnumber <= $testBn) {
	echo json_encode($json->stage->test);
} else {
	echo json_encode($json->stage->development); 
}

exit();

?>
