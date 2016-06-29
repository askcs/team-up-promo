team-up-promo
===========

## Install
npm install

## Run
gulp

## Configuring `backends.php`

1. If `backends.json` does not exist in the root, create a copy of `backends-example.json`: `cp backends-example.json backends.json`
2. Replace the example values in backends.json with your back-end URLs
3. The Android app, for example, having build number 255, calls `/backends.php?frontend=android&buildnumber=255`

`backends.php` serves a list of back-end URLs based on the given front-end and buildnumber. It expects all build numbers to be incremental. 

The script uses the following code to determine to send the list of back-ends:

```
$buildnumber = $_GET['buildnumber'];

if ($buildnumber > 0 && $buildnumber <= $prodBn) {
	return stage->production;
} elseif ($buildnumber > $prodBn && $buildnumber <= $demoBn) {
	return stage->demo;
} elseif ($buildnumber > $demoBn && $buildnumber <= $testBn) {
	return stage->test;
} else {
	return stage->development; 
}

```
