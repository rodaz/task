<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Task Manager</title>
		<link rel="stylesheet" href="dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="styles/styles.css" />
	</head>
	<body>
		<script src="js/jquery-latest.js"></script>
		<script src="dist/js/bootstrap.min.js"></script>
		<script src="js/task.js"></script>

		<div id='createNewList' align='center'>
			<br />
    			<input autofocus class='createListName input-lg' id='listName' type='text' name='list' />
    		<br />
    		<p id = 'errorName' class="text-error">Invalid list name...input again</p>
    		<button class='createListName btn btn-success btn-lg' onclick='addNameL()' type='button'>Create
    		</button>
    		<button id = 'CancelCreateList' class='createListName btn  btn-lg' onclick='CleanListName()' type='button'>Cancel
    		</button>
    	</div>
		<div align="center" class="add">
			<button type="button" class="btn btn-primary btn-lg btn-lg" onclick="toggleNewList()">
				<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
				Add TODO List
			</button>
		</div>
		<div id = 'lists'>
		<?php
			$dbconn = pg_connect("host=ec2-54-163-238-96.compute-1.amazonaws.com user=hohwhcqyenkbln password=XjKoITn9jLXF-IadxfVqinZcx9 dbname=d2t9ld3surh4bu")
 				or die('Could not con: '.pg_last_error());
			$query = "SELECT * FROM listing";
			$result = pg_query($query)or die('Error '.pg_last_error());
			if (is_resource($result)){
				while ($raw = pg_fetch_row($result)) {
						$res[] = $raw;
					}
				if (is_array($res)){
					foreach ($res as $value) {
						$query = "SELECT * FROM $value[1] ORDER BY priority";
						$result = pg_query($query)or die('Error '.pg_last_error());
						$tasks = array();	
						while ($row = pg_fetch_assoc($result)) {
							$tasks[] = $row;
						}
						
						echo "<div class='listeN panTask list'>
						      <div class='panelka'>
						        <div class='panel panel-primary'>
						          <div class='panel-heading'>
						            <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span>
						            <span class='sPanel'>$value[1]</span>
						            <span class='glyphicon glyphicon-trash buttonDeleteList' aria-hidden='true'></span>
						            <span class='glyphicon glyphicon-pencil buttonEditList' aria-hidden='true'></span>
						          </div>
						        </div>
						      </div>
						      <div class='addTask'>
						        <div class='panel panel-danger'>
						          <div class='panel-heading'>
						            <span class='glyphicon glyphicon-plus plusTask' aria-hidden='true'></span>  
						            <div class='formo4ka'>
						              <div class='input-group'>
						                <input type='text' class='form-control newTaskValue' placeholder='Start typing here to create a task...' />
						                <span class='input-group-btn'>
						                  <button class='btn btn-success btnAddTask' type='button'>Add Task</button>
						                </span>
						              </div>
						            </div>
						          </div>  
						        </div>
						    </div>
						    <div class='globalList'>
		  						<ul class='list-group ulCont'>";
		  				foreach ($tasks as $value) {
							echo "<li class='list-group-item list-group-item-success ulli'>
							      <ul class='list-group list-inline ul-list'>
							        <li>";
							if ($value[done])
								echo "<span class='glyphicon glyphicon-check buttonDoneTask' aria-hidden='true'></span>";
							else
								echo "<span class='glyphicon glyphicon-unchecked buttonDoneTask' aria-hidden='true'></span>";
							echo "</li>
							        <li><span class='taskValue'>$value[taskname]</span></li>
							        <li class='taskOptions'><span class='glyphicon glyphicon-trash buttonDeleteTask' aria-hidden='true'></span></li>
							        <li class='taskOptions'><span class='glyphicon glyphicon-pencil buttonEditTask' aria-hidden='true'></span></li>
							        <li class='taskOptions'><span class='buttonDownTask glyphicon glyphicon-triangle-bottom' aria-hidden='true'></span></li>
		          					<li class='taskOptions1'><span class='buttonUpTask glyphicon glyphicon-triangle-top' aria-hidden='true'></span></li>
							      </ul>
							    </li>";	
						}
						echo "</ul>
		  					</div>
		  				</div>";
					}
				}
			}
			pg_close();
		?>
		</div>			
	</body>
</html>