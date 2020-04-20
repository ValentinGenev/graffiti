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
	$db_response			= $db_controller->create_messages_entry($data);

	if ($db_response === 1) {
		http_response_code(200);
		print_r('Message sent.');
	}
	else {
		http_response_code(400);
		print_r($db_response);
	}
}
else {
	header("Location: http://{$_SERVER['HTTP_HOST']}", true, 302);
	exit();
}
