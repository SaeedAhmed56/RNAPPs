<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$CN = mysqli_connect("localhost", "root", "");
if (!$CN) {
    die(json_encode(["error" => "Database connection failed"]));
}

$DB = mysqli_select_db($CN, "cst");
if (!$DB) {
    die(json_encode(["error" => "Failed to select database"]));
}

// Handle both JSON and form-data inputs
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    // For JSON input
    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    if (!isset($DecodedData["FindRollNo"])) {
        echo json_encode(["error" => "FindRollNo is missing"]);
        exit();
    }

    $FindRollNo = intval($DecodedData["FindRollNo"]); // Ensure it is numeric
} elseif (strpos($_SERVER['CONTENT_TYPE'], 'multipart/form-data') !== false) {
    // For form-data input
    if (!isset($_POST["FindRollNo"])) {
        echo json_encode(["error" => "FindRollNo is missing"]);
        exit();
    }

    $FindRollNo = intval($_POST["FindRollNo"]); // Ensure it is numeric
} else {
    // Unsupported content type
    echo json_encode(["error" => "Unsupported content type"]);
    exit();
}

// Prepare and execute query
$SQ = "SELECT * FROM studentmaster WHERE RollNo = ?";
$stmt = mysqli_prepare($CN, $SQ);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "i", $FindRollNo);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $Row = mysqli_fetch_assoc($result);
        $Response = [
            "RollNo" => $Row["RollNo"],
            "StudentName" => $Row["StudentName"],
            "Course" => $Row["Course"]
        ];
    } else {
        $Response = [
            "RollNo" => "",
            "StudentName" => "",
            "Course" => ""
        ];
    }
    mysqli_stmt_close($stmt);
} else {
    $Response = ["error" => "Failed to prepare the SQL statement"];
}

// Output JSON response
echo json_encode($Response);

// Close database connection
mysqli_close($CN);
?>
