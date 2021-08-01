<?php
/**
 * Creates а single message
 */


include_once 'create-connection.php';
include_once 'class-table-actions.php';
include_once '../inc/functions.php';
include_once '../inc/sanitize.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	header("Location: http://{$_SERVER['HTTP_HOST']}", true, 302);
	exit();
}

$db_controller = new Table_Actions($connection);

$data['poster_id']	= hash('md5', $_SERVER['REMOTE_ADDR'], false);
$poster_last_post		= $db_controller->get_last_message_by_poster($data['poster_id'])->fetch_assoc();
$post_timeout				= 1;
$poster_is_spammy		= check_if_poster_is_spammy($poster_last_post, $post_timeout);

if ($poster_is_spammy) {
	http_response_code(202);
	print_r(json_encode(['error' => "Please wait $post_timeout minutes before writing again."]));
	die;
}

$data['poster']		= $_POST['alias'] !== '' ? $_POST['alias'] : 'Anonymous';
$data['message']	= sanitize_message_html($_POST['message']);

$db_response = $db_controller->create_messages_entry($data);

if ($db_response === 1) {
	http_response_code(200);

	$response_text['postedMessage'] = $db_controller->get_last_message_by_poster($data['poster_id'])->fetch_assoc();
	$response_text['responseMessage'] = 'Message sent.';
	print_r(json_encode($response_text));
}
else {
	http_response_code(400);
	print_r(json_encode(['error' => $db_response]));
}

$db_connection->close_connection();
