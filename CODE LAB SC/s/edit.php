<?php
    // Connect to the database
    $conn = new mysqli("localhost", "root", "", "registerdb");
    $conn->query("SET NAMES UTF8");

    
    if(isset($_POST['submit'])){
        
        $id = $_GET['id'];
        $FirstName = $_POST['FirstName'];
        $LastName = $_POST['LastName'];
        $Age = $_POST['Age'];
        $Gender = $_POST['Gender'];

        
        $sql = "UPDATE Register SET FirstName='$FirstName', LastName='$LastName', Age='$Age', Gender='$Gender' WHERE id=$id";
        $result = mysqli_query($conn, $sql);

       
        if($result){
            echo "<span style='font-size: 24px;'><b>Update Successfully!!</b></span><br>";
            echo "<a href='view.php'>Back to Home</a>";
        } 
    } else if(isset($_POST['cancel'])){
       
        $id = $_GET['id'];
        $sql = "DELETE FROM Register WHERE id=$id";
        $result = mysqli_query($conn, $sql);

        
        if($result){
            echo "<a href='view.php'>Back to Home</a>";
        } 
    }
?>
