<?php
 	$listName = ($_POST['listName']);
 	$taskName = ($_POST['taskName']);
 	$upDown = ($_POST['upDown']);
 	$nextPrev = ($_POST['nextPrev']);
 	$dbconn = pg_connect("host=ec2-54-163-238-96.compute-1.amazonaws.com user=hohwhcqyenkbln password=XjKoITn9jLXF-IadxfVqinZcx9 dbname=d2t9ld3surh4bu")
 		or die('Could not con: '.pg_last_error());
 	if($upDown)	{
 		$query = "UPDATE $listName SET priority=priority+1
 				WHERE taskName='$taskName'";
 		$query1 = "UPDATE $listName SET priority=priority-1
 				WHERE taskName='$nextPrev'";
 	}else{
 		$query = "UPDATE $listName SET priority=priority-1
 				WHERE taskName='$taskName'";
 		$query1 = "UPDATE $listName SET priority=priority+1
 				WHERE taskName='$nextPrev'";
 	}
 	$result	= pg_query($query)
		or die('Could not con: '.pg_last_error());
	$result1 = pg_query($query1)
		or die('Could not con: '.pg_last_error());
	pg_close();
?>