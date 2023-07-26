<?php


$conn=mysqli_connect("localhost", "root", "","registerdb"); 
$conn->query("SET NAMES UTF8");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$firstname = $_POST['name'];
$lastname = $_POST['last'];
$age = $_POST['Age'];
$gender = $_POST['gender'];
$photo = $_POST['avatar'];

$sql_check = "SELECT * FROM Register WHERE FirstName = '$firstname' AND LastName = '$lastname' AND Age = '$age' AND Gender = '$gender' AND photo = '$photo'";
$result_check = mysqli_query($conn, $sql_check);

if (mysqli_num_rows($result_check) > 0) {
  // ข้อมูลซ้ำ แสดงข้อความแจ้งเตือน
  echo "<span style='font-size: 24px;'><b>ข้อมูลที่ใส่มามีอยู่ในระบบแล้ว</b></span>";
} else {
  $sql = "INSERT INTO Register (FirstName, LastName, Age, Gender, photo)
          VALUES ('$firstname', '$lastname', '$age', '$gender','$photo')";
  $result = mysqli_query($conn, $sql);
  
  if ($result === TRUE) {
    echo "<span style='font-size: 24px;'><b>Insertion Successfully!!</b></span>";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}


$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
	<title>Insert Form</title>
</head>
<body>
		<br><br><a href="view.php">กลับไปยังหน้าหลัก</a>
	</div>
</body>
</html>
