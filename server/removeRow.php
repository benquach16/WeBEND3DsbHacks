<?php

$con = mysqli_connect("localhost","root","","sb_hackathon_test");
 
if (mysqli_connect_errno()) {
    echo 'Failed to connect to MySQL: ' . mysqli_connect_error();
    exit();
}

$sql = mysqli_query( $con,
	"delete from .".$_POST["tableName"]." where id = ".$_POST["id"]
	);
	
mysqli_close($con);
?>