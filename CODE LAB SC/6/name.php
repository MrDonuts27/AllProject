<?php 
$name = $_GET["fristname"];

// connect to the database
$conn=mysqli_connect("localhost", "root", "","RegisterDB"); 
$conn->query("SET NAMES UTF8");

// retrieve matching names from database
$sql="SELECT FirstName FROM register WHERE FirstName LIKE '%$name%'";
$rs=$conn->query($sql); 

// create array to hold matching names
$names = array();

// loop through results of database query, adding each matching name to array
while($row = $rs->fetch_assoc()) {
    $names[] = $row['FirstName'];
}

// return array of matching names as JSON
echo json_encode($names);

$conn->close();
?>
