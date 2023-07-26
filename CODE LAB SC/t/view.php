<html>
<head>
<title>View Register Database</title>
<script type="text/javascript"> 
function displaymessage(id) {
    var response = confirm("Are you sure to delete #id " + id + "?"); 
    if (response == true) { 
        window.location.href = "delete.php?id=" + id; 
        return true; 
    } else { 
        return false; 
    } 
}

</script>
</head>
<body>
<p><a href="insertForm.htm">Add a new record</a></p>
<?php
// connect to the database
$conn=mysqli_connect("localhost", "root", "","registerdb"); 
$conn->query("SET NAMES UTF8");
// get results from database
$sql="SELECT * FROM Register";
$rs=$conn->query($sql); 
// Print Header of Table
echo "<table border='1' cellpadding='10' width=80%>"; //open table
echo "<tr> 
<th>ID</th> 
<th>First Name</th> 
<th>Last Name</th> 
<th>Age</th> 
<th>Gender</th> 
<th>Photo</th> 
<th></th> 
 </tr>";
// loop through results of database query, displaying them in the table
while($row = $rs->fetch_assoc()) {
 // echo out the contents of each row into a table
echo "<tr>";
echo '<td>' . $row['ID'] . '</td>';
echo '<td>' . $row['FirstName'] . '</td>';
echo '<td>' . $row['LastName'] . '</td>';
echo '<td>' . $row['Age'] . '</td>';
echo '<td>' . $row['Gender'] . '</td>';
echo '<td>'."<img src='" . $row["photo"]. "' width='45'></td>'";
echo '<td><a href="editForm.php?id=' . $row['ID'] . '">Edit</a> ';
echo ' <a href="#" onclick="return displaymessage(' . $row['ID'] . ')">Delete</a></td>';

echo "</tr>";
}
echo "</table>"; // close table
$conn->close(); // close database connection
?>
</body>
</html>