<?php
 	$listName = ($_POST['listName']);
 	$oldTaskName = ($_POST['oldTaskName']);
 	$newTaskName = ($_POST['newTaskName']);
 	$dbconn = pg_connect("host=ec2-54-163-238-96.compute-1.amazonaws.com user=hohwhcqyenkbln password=XjKoITn9jLXF-IadxfVqinZcx9 dbname=d2t9ld3surh4bu")
 		or die('Could not con: '.pg_last_error());
 	$query = "UPDATE $listName SET taskName='$newTaskName'
 				WHERE taskName='$oldTaskName'";
 	$result	= pg_query($query)
		or die('Could not con: '.pg_last_error());
	pg_close();
?>