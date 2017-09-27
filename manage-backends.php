<?php

global $oplog;

define('FILENAME', 'backends.json');

if (file_exists(FILENAME) === false) {
    die("backends.json does not exist!");
}

if (is_readable(FILENAME) === false) {
    die("backends.json is not readable by this script! User running this script: " . `whoami`);
}

if (is_writable(FILENAME) === false) {
    oplog('warning', "File is readable, but not writable! User running this script: " . `whoami`);
}

$file = file_get_contents(FILENAME);
$json = json_decode($file);

if (isset($_POST['submit']) && $_POST['submit'] === "Submit") {

    $android_demo = $_POST['android_demo'];
    $android_test = $_POST['android_test'];
    $ios_demo = $_POST['ios_demo'];
    $ios_test = $_POST['ios_test'];
    $webapp_demo = $_POST['webapp_demo'];
    $webapp_test = $_POST['webapp_test'];

    // Save configuration

    $updatedAny = false;

    if (!empty($android_demo) && validateVersionNumberInput($android_demo, 'android_demo')) {
        $original = $json->android->demo;
        $updated = intval($android_demo);

        if ($updated >= $json->android->production) {
            $json->android->demo = $updated;
            oplog('info', "Changed android demo from $original to $updated");
            $updatedAny = true;
        } else {
            oplog('warning', "android demo not changed to $updated, as it is lower or equal to production");
        }
    }

    if (!empty($android_test) && validateVersionNumberInput($android_test, 'android_test')) {
        $original = $json->android->test;
        $updated = intval($android_test);

        if ($updated >= $json->android->production) {
            $json->android->test = $updated;
            oplog('info', "Changed android test from $original to $updated");
            $updatedAny = true;
        } else {
            oplog('warning', "android test not changed to $updated, as it is lower or equal to production");
        }
    }

    if (!empty($ios_demo) && validateVersionNumberInput($ios_demo, 'ios_demo')) {
        $original = $json->ios->demo;
        $updated = intval($ios_demo);

        if ($updated >= $json->ios->production) {
            $json->ios->demo = $updated;
            oplog('info', "Changed ios demo from $original to $updated");
            $updatedAny = true;
        } else {
            oplog('warning', "ios demo not changed to $updated, as it is lower or equal to production");
        }
    }

    if (!empty($ios_test) && validateVersionNumberInput($ios_test, 'ios_test')) {
        $original = $json->ios->test;
        $updated = intval($ios_test);

        if ($updated >= $json->ios->production) {
            $json->ios->test = $updated;
            oplog('info', "Changed ios test from $original to $updated");
            $updatedAny = true;
        } else {
            oplog('warning', "ios test not changed to $updated, as it is lower or equal to production");
        }
    }

    if (!empty($webapp_demo) && validateVersionNumberInput($webapp_demo, 'webapp_demo')) {
        $original = $json->webapp->demo;
        $updated = intval($webapp_demo);

        if ($updated >= $json->webapp->production) {
            $json->webapp->demo = $updated;
            oplog('info', "Changed webapp demo from $original to $updated");
            $updatedAny = true;
        } else {
            oplog('warning', "webapp demo not changed to $updated, as it is lower or equal to production");
        }
    }

    if (!empty($webapp_test) && validateVersionNumberInput($webapp_test, 'webapp_test')) {
        $original = $json->webapp->test;
        $updated = intval($webapp_test);

        if ($updated >= $json->webapp->production) {
            $json->webapp->test = $updated;
            oplog('info', "Changed webapp test from $original to $updated");
            $updatedAny = true;
        } else {
            oplog('warning', "webapp test not changed to $updated, as it is lower or equal to production");
        }
    }

    if ($updatedAny) {
        $writeFileResult = file_put_contents('backends.json', json_encode($json));

        if ($writeFileResult === false) {
            oplog('danger', "Did not write changes to file! Check PHP logs for errors");
        } else {
            oplog('success', "Changes written to file.");
        }
    } else {
        oplog('info', "No changes applied.");
    }
}

/**
 * Returns true when valid, otherwise a string with the failure reason.
 */
function validateVersionNumberInput($input, $name) {

    if (is_numeric($input) === false) {
        oplog('warning', "Expecting version number for '$name' to be an int! It is now not even numberic.");
        return false;
    }

    $val = intval($input);

    if ($val < 1) {
        oplog('warning', "Expecting version number for '$name' to be higher than 0!");
        return false;
    }

    return true;
}

function output_oplog() {

    global $oplog;

    if (empty($oplog)) {
        return "no oplog";
    }

    $innerHtml = "";

    foreach($oplog as $log) {
        $innerHtml .= '<tr><td class="table-' . $log->level . '">' . $log->message . '</td></tr>';
    }

    return '<table class="table"><tbody>' . $innerHtml . '</tbody></table>';
}

function oplog($level, $message) {

    global $oplog;

    if ($oplog == null) {
        $oplog = array();
    }

    $log = new StdClass();
    $log->level = $level;
    $log->message = $message;

    $oplog[] = $log;
}

?>
<html>
<head>
    <title>Manage Backends</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <style>
        body { padding: 2rem; }
        div.header {
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: .05rem solid #e5e5e5;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
</head>

<body>

<div class="container">
    <div class="header">
        <h3 class="text-muted">Manage Front-end versions</h3>
    </div>

    <div class="alert alert-warning" role="alert">
        This form changes <a href="https://teamtelefoon.nl/backends.php">teamtelefoon.nl/backends.php</a>. Only change values if you know what you are doing! <strong>You will be fired otherwise.</strong>
    </div>

    <h2>Change version codes</h2>

    <p>Only enters version numbers that you want to change.</p>

    <?php if (!empty($oplog)) { echo output_oplog(); } ?>

    <form method="POST" action="">

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th colspan="2">Production</th>
                <th colspan="2">Demo</th>
                <th colspan="2">Test</th>
            </tr>
            <tr>
                <th>&nbsp;</th>
                <td>Current</td>
                <td>New</td>
                <td>Current</td>
                <td>New</td>
                <td>Current</td>
                <td>New</td>
            </tr>
            </thead>

            <tbody>
            <tr>
                <th>Android</th>
                <td><?php echo $json->android->production;?></td>
                <td><em>Change manually on server</em></td>
                <td><?php echo $json->android->demo;?></td>
                <td><input title="Android Demo" type="number" min="1" name="android_demo" value="" /></td>
                <td><?php echo $json->android->test;?></td>
                <td><input title="Android Test" type="number" name="android_test" value="" /></td>
            </tr>
            <tr>
                <th>iOS</th>
                <td><?php echo $json->ios->production;?></td>
                <td><em>Change manually on server</em></td>
                <td><?php echo $json->ios->demo;?></td>
                <td><input title="iOS Demo" type="number" min="1" name="ios_demo" value="" /></td>
                <td><?php echo $json->ios->test;?></td>
                <td><input title="iOS Test" type="number" min="1" name="ios_test" value="" /></td>
            </tr>
            <tr>
                <th>Webapp</th>
                <td><?php echo $json->webapp->production;?></td>
                <td><em>Change manually on server</em></td>
                <td><?php echo $json->webapp->demo;?></td>
                <td><input title="Webapp Demo" type="number" min="1" name="webapp_demo" value="" /></td>
                <td><?php echo $json->webapp->test;?></td>
                <td><input title="Webapp Test" type="number" min="1" name="webapp_test" value="" /></td>
            </tr>
            </tbody>
        </table>

        <input type="submit" name="submit" value="Submit" />

    </form>

    <h2>Current backends.json</h2>
    <pre><?php echo file_get_contents(FILENAME); ?></pre>
</div>
</body>
</html>