<?php
/**
 * Creates а single message
 */


include_once 'connect.php';
include_once 'class-table-actions.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$data['poster']		= isset($_POST['poster']) ? $_POST['poster'] : 'Anonymous';
	$data['message']	= $_POST['message'];

	$db_controller		= new Table_Actions($connection);
	echo $db_controller->create_messages_entry($data);

	// TO DO: add header status
}
else {
	header("Location: http://{$_SERVER['HTTP_HOST']}", true, 302);
	exit();
}
