<?php
/**
 * Creates а single message
 */


include_once 'create-connection.php';
include_once 'class-table-actions.php';
include_once 'functions.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$db_controller			= new Table_Actions($connection);

	$data['poster_id']	= hash('md5', '0.0.0.1', false); // $_SERVER['REMOTE_ADDR']
	$poster_last_post		= $db_controller->get_last_message_by_poster($data['poster_id'])->fetch_assoc();
	$poster_is_spammy		= check_if_poster_is_spammy($poster_last_post, 2);

	if ($poster_is_spammy) {
		http_response_code(403);
		print_r('Please wait 2 minutes before posting again.');
		die;
	}

	$data['poster']			= isset($_POST['poster']) ? $_POST['poster'] : 'Anonymous';
	$data['message']		= $_POST['message'];
	$db_response				= $db_controller->create_messages_entry($data);

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