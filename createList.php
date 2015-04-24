<?php
	$listName = ($_POST['listName']);
 	$dbconn = pg_connect("host=ec2-54-163-238-96.compute-1.amazonaws.com user=hohwhcqyenkbln password=XjKoITn9jLXF-IadxfVqinZcx9 dbname=d2t9ld3surh4bu")
 		or die('Could not con: '.pg_last_error());
 	$query = "CREATE TABLE IF NOT EXISTS listing (
 		list_id SERIAL,
 		listName VARCHAR(100) not null,
		PRIMARY KEY (list_id))";
	$result = pg_query($query)
		or die('Error '.pg_last_error());
 	$query = "INSERT INTO listing (listName)
 				VALUES ('$listName')";
 	$result	= pg_query($query)or die('Error '.pg_last_error());
 	$query = "CREATE TABLE $listName (
 		task_id SERIAL,
 		taskName TEXT not null,
 		done INT,
 		priority smallserial, 
 		PRIMARY KEY (task_id))";
	$result = pg_query($query)or die('Error '.pg_last_error());
	pg_close();
?>