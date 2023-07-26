<!DOCTYPE html>
<html>
<head>
	<title>Edit Record</title>
</head>
<body>
	<?php
		
        $conn = new mysqli("localhost", "root", "", "registerdb");
        $conn->query("SET NAMES UTF8");
		
		if(isset($_GET['id'])){
			$id = $_GET['id'];
            		
			$sql = "SELECT * FROM Register WHERE id = $id";
			$result = mysqli_query($conn, $sql);

			if(mysqli_num_rows($result) > 0){
				$row = mysqli_fetch_assoc($result);
				$FirstName = $row['FirstName'];
	            $LastName = $row['LastName'];
	            $Age = $row['Age'];
	            $Gender = $row['Gender'];
            }
		}
	?>
	<form method="post" action="edit.php?id=<?php echo $id; ?>">
    <div style="text-align:center;">
		First Name: <input type="text" name="FirstName" value="<?php echo $FirstName; ?>"maxlength="15" size="15"required><br><br>
		Last Name: <input type="text" name="LastName" value="<?php echo $LastName; ?>"maxlength="15" size="15"required><br><br>
		Age: <input type="text" name="Age" value="<?php echo $Age; ?>"maxlength="10" size="10"required><br><br>
        Gender:<select name="Gender"required>
			<option value="male" <?php if($Gender == 'male'){echo 'selected';} ?>>Male</option>
			<option value="female" <?php if($Gender == 'female'){echo 'selected';} ?>>Female</option>
		</select><br><br>
		<input type="submit" name="submit" value="Save">
		<input type="submit" name="cancel" value="Cancel">
    </div>
	</form>
</body>
</html>

