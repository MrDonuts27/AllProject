<html>
<head>
    <title>View Register Database</title>
    <script type="text/javascript" src="showName.js"></script> 
    <script type="text/javascript">
        function d(id) {
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
    <form method="GET">
    <input type="text" list="name" name="search" oninput="searchName(this.value)">
    <datalist id="name">
    <?php
        $conn = mysqli_connect("localhost", "root", "", "registerdb"); 
        $conn->query("SET NAMES UTF8");

        $sql = "SELECT DISTINCT FirstName FROM register";
        $rs = $conn->query($sql); 

        while($row = $rs->fetch_assoc()) {
            echo '<option value="' . $row['FirstName'] . '">' . $row['FirstName'] . '</option>';
        }

        $conn->close(); 
    ?>
</datalist>

        <input type="submit" value="search">
    </form>

    
    <?php
    // connect to the database
    $conn=mysqli_connect("localhost", "root", "", "registerdb"); 
    $conn->query("SET NAMES UTF8");

    // get results from database
    if (isset($_GET["search"])) {
        $name = $_GET["search"];
        $sql="SELECT * FROM register WHERE FirstName LIKE '$name%'";
    } else {
        $name = "%";
        $sql="SELECT * FROM register";
    }

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
        $id = $row['ID'];
        $data = "return alertID($id)";
        // echo out the contents of each row into a table
        echo "<tr>";
        echo '<td>' . $row['ID'] . '</td>';
        echo '<td>' . $row['FirstName'] . '</td>';
        echo '<td>' . $row['LastName'] . '</td>';
        echo '<td>' . $row['Age'] . '</td>';
        echo '<td>' . $row['Gender'] . '</td>';
        echo '<td><img src="' . $row["photo"]. '" width="45"></td>';
        echo '<td><a href="editForm.php">Edit</a> ';
        echo ' <a href="#" onclick="return d(' . $row['ID'] . ')">Delete</a></td>';

        echo "</tr>";
    }
    echo "</table>"; // close table
    $conn->close(); // close database connection
    ?>
</body>
</html>