<?php



  
  $conn = new mysqli("localhost", "root", "", "registerdb");
  $conn->query("SET NAMES UTF8");
  
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  if (isset($_GET['id'])) { 
 
  $sql = "DELETE FROM Register WHERE ID=?";
  
  
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $_GET['id']);
  

  if ($stmt->execute()) {
   
    echo "<span style='font-size: 24px;'><b>ID ".$_GET['id']." Deleted Already.</b></span>";
  } else {
    echo "Error deleting record: " . $conn->error;
  }

  
  $conn->close();

 
  echo "<br><a href='view.php'>Go to Home</a>";
} 