<?php
// Headers to allow cross-origin requests and define content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Connect to the database
$CN = mysqli_connect("localhost", "root", "", "cst");

// Check for database connection error
if (!$CN) {
    echo json_encode([["message" => "Database connection failed"]]);
    exit();
}

// Check if required fields are present in the POST data
if (isset($_POST['RollNo']) && isset($_POST['StudentName']) && isset($_POST['Course'])) {
    $RollNo = mysqli_real_escape_string($CN, $_POST['RollNo']);
    $StudentName = mysqli_real_escape_string($CN, $_POST['StudentName']);
    $Course = mysqli_real_escape_string($CN, $_POST['Course']);

    // SQL query to insert data
    $IQ = "INSERT INTO studentmaster (RollNo, StudentName, Course) VALUES ('$RollNo', '$StudentName', '$Course')";

    if (mysqli_query($CN, $IQ)) {
        $response = [["message" => "Record inserted successfully"]];
    } else {
        $response = [["message" => "Error inserting record: " . mysqli_error($CN)]];
    }
} else {
    $response = [["message" => "Required fields are missing"]];
}

// Output response in JSON format
echo json_encode($response);

// Close the database connection
mysqli_close($CN);
?>
