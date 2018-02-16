<?php

define('DEBUG', false);

define('FD_TICKET_DEFAULT_STATUS', 2); // 2 = medium
define('FD_TICKET_DEFAULT_SOURCE', 1); // 1 = email, see freshdesk api docs for other values
define('FD_TICKET_DEFAULT_PRIORITY', 1); // 1 = low, see freshdesk api docs for other values

$input = collectFormInput();
$config = getFreshdeskConfig();

$subject = "";
$message = "";

if (!empty($input->message)) {
    $message = $input->message;
    $subject .= "Contactformulier teamtelefoon.nl. Informatieverzoek van " . $input->name;
} else if (!empty($input->dateTime)) {
    $message = "Voorgestelde datum: " . $input->dateTime;
    $subject .= "Contactformulier teamtelefoon.nl. Demonstratie aangevraagd door " . $input->name;
}

$result = createFreshdeskTicket($config, $input->name, $input->company, $input->email, $input->phone, $subject, $message);

if ($result === true) {
    http_response_code(200);
} else {
    http_response_code (500);
}

echo $result;

// Functions

function collectFormInput()
{
    $formInput = new StdClass();
    $formInput->name = isset($_GET['contactName']) ? $_GET['contactName'] : "";
    $formInput->email = isset($_GET['contactEmail']) ? $_GET['contactEmail'] : "";
    $formInput->phone = isset($_GET['contactCompanyPhone']) ? $_GET['contactCompanyPhone'] : "";
    $formInput->message = isset($_GET['message']) ? $_GET['message'] : "";
    $formInput->dateTime = isset($_GET['contactDateTime']) ? $_GET['contactDateTime'] : "";
    $formInput->company = isset($_GET['contactCompanyName']) ? $_GET['contactCompanyName'] : "";

    // Sanitize input
    $formInput->name = filter_var($formInput->name, FILTER_SANITIZE_STRING);
    $formInput->email = filter_var($formInput->email, FILTER_SANITIZE_EMAIL);
    $formInput->phone = filter_var($formInput->phone, FILTER_SANITIZE_STRING);
    $formInput->message = filter_var($formInput->message, FILTER_SANITIZE_STRING);
    $formInput->dateTime = filter_var($formInput->dateTime, FILTER_SANITIZE_STRING);
    $formInput->company = filter_var($formInput->company, FILTER_SANITIZE_STRING);

    return $formInput;
}

function getFreshdeskConfig()
{
    $decodedConfig = json_decode(file_get_contents("contact-form-credentials.json"));

    if (DEBUG) print_r($decodedConfig);

    if (!isset($decodedConfig->apiKey) || !is_string($decodedConfig->apiKey)) {
        die("Missing configuration item 'apiKey' or is not a string.");
    }

    if (!isset($decodedConfig->ticketApiUrl) || !is_string($decodedConfig->ticketApiUrl)) {
        die("Missing configuration item 'ticketApiUrl' or is not a string.");
    }

    $config = new StdClass();
    $config->ticketApiUrl = $decodedConfig->ticketApiUrl;
    $config->apiKey = $decodedConfig->apiKey;

    if (isset($decodedConfig->ticketStatus) && is_int($decodedConfig->ticketStatus)) {
        $config->status = $decodedConfig->ticketStatus;
    } else {
        $config->status = FD_TICKET_DEFAULT_STATUS;
    }

    if (isset($decodedConfig->ticketSource) && is_int($decodedConfig->ticketSource)) {
        $config->source = $decodedConfig->ticketSource;
    } else {
        $config->source = FD_TICKET_DEFAULT_SOURCE;
    }

    if (isset($decodedConfig->ticketPriority) && is_int($decodedConfig->ticketPriority)) {
        $config->priority = $decodedConfig->ticketPriority;
    } else {
        $config->source = FD_TICKET_DEFAULT_SOURCE;
    }

    if (isset($decodedConfig->ticketGroupId) && is_int($decodedConfig->ticketGroupId)) {
        $config->groupId = $decodedConfig->ticketGroupId;
    } else {
        die("Missing configuration item 'ticketGroupId' or is not an int.");
    }

    return $config;
}

function createFreshdeskTicket($config, $name, $company, $email, $phone, $subject, $message)
{

    // Freshdesk API docs: https://developers.freshdesk.com/api/

    // curl -v -u apikey:X -H "Content-Type: application/json" -X GET 'https://domain.freshdesk.com/api/v2/tickets'

    $body = new StdClass();
    $body->name = $name;

    if (!empty($company)) {
        $body->name .= " (" . $company . ")";
    }

    $body->email = $email;
    $body->phone = $phone;
    $body->description = $message;
    $body->subject = $subject;

    $body->custom_fields = array(
        "uw_organisatie" => $company,
        "telefoonnummer" => $phone
    );

    $body->source = $config->source; // 1 = email, 2 = portal, 3 = phone, 7 = chat, 8 = mobihelp, 9 = feedback widget, 10 = outbound mail
    $body->status = $config->status; // 2 = open, 3 = pending, 4 = resolved, 5 = closed
    $body->priority = $config->priority; // 1 = low, 2 = medium, 3 = high, 4 = urgent
    $body->group_id = $config->groupId; // Product Management group id for TeamTelefoon

    $jsonBody = json_encode($body);

    logToFile($jsonBody);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $config->ticketApiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$config->apiKey:X");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($jsonBody))
    );

    if (DEBUG) {
        echo "Request: \n";
        echo "config = " . var_export($config, true) . "\n";
        echo "body = " . var_export($jsonBody, true) . "\n";
    }

    $result = curl_exec($ch);

    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (DEBUG) {
        echo "cURL result: http status code = $httpStatusCode, body result = $result";
        echo "cURL getinfo(): " . print_r(curl_getinfo($ch));
    }

    curl_close($ch);

    return $result !== false && $httpStatusCode === 200;
}

// Log to file, in case freshdesk is down...
function logToFile($body)
{
    try {
        $handle = fopen('/tmp/mail.log', 'ab');
        fwrite($handle, $body . "\n\n");
        fclose($handle);
    } catch (Exception $e) {
        if (DEBUG) {
            echo "Write to file failed!";
            echo $e;
        }
    }
}

?>
