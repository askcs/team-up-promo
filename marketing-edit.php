<?php
// CORS things..
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Request-Headers: Origin, X-Requested-With, Content-Type, Accept");

$fileContent = file_get_contents('marketing.json');

if ($fileContent == null || empty($fileContent)) {
    header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
    exit('{"error":"Not found"}');
}

$marketingContent = json_decode($fileContent);

if(isset($_POST['newHtml'])) {
	$marketingContent->html = $_POST['newHtml'];
	$jsonString = json_encode($marketingContent);
	file_put_contents('marketing.json', $jsonString);
}
if(isset($_GET['edit'])) {
	echo "<form method='POST'>\n";
	echo "<h2>TeamTelefoon Marketing Box</h2>\n";
	echo "<p>Edit the text for the marketing box in the box below. You can directly type HTML.</p>\n";
	echo "<ul>\n";
	echo "<li>&lt;i&gt;Italic text&lt;/i&gt;</li>\n";
	echo "<li>&lt;b&gt;Bold text&lt;/b&gt;</li>\n";
	echo "<li>&lt;a href='https://teamtelefoon.nl/'&gt;Some link&lt;/a&gt;</li>\n";
	echo "</ul>\n";
	echo "<textarea rows='2' cols='50' style='font-size:16px;' name='newHtml'>\n";
	echo $marketingContent->html;
	echo "</textarea>\n";
	echo "<input type='submit' value='Save' style='font-size:16px;'>\n";
	echo "</form>\n";
}
else {
	// Always return JSON
	header("Content-Type: application/json");

	if($marketingContent !== null) {
	    echo json_encode($marketingContent);
	} else {
	    echo "{}";
	}
}
?>
