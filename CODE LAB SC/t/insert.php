<?php

$conn = mysqli_connect("localhost", "root", "", "RegisterDB");


if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}



$Firstname = $_POST["Firstname"];
$Lastname = $_POST["Lastname"];
$Age = $_POST["Age"];
$Gender = $_POST["Gender"];
$photo = $_POST['avatar'];


$sql = "INSERT INTO Register (Firstname, Lastname, Age, Gender, photo) VALUES ('$Firstname', '$Lastname', '$Age','$Gender','$photo')";


if (mysqli_query($conn, $sql)) {
    echo "Insertion Successfully!!<br>";
    echo "<a href='view.php'><br>Go to Home</a>";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}


mysqli_close($conn);
?>