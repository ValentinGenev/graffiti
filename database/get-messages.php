<?php
/**
 * Gets all messages
 */


include_once 'create-connection.php';
include_once 'class-table-actions.php';

$payload_count	= isset($_GET['count']) ? $_GET['count'] : 10;
$oldest_loaded	= isset($_GET['oldest_loaded']) ? $_GET['oldest_loaded'] : null;
$newest_loaded	= isset($_GET['newest_loaded']) ? $_GET['newest_loaded'] : null;

$db_controller	= new Table_Actions($connection);
$db_response		= $db_controller->get_messages($payload_count, $oldest_loaded, $newest_loaded);

if (isset($db_response->num_rows) && $db_response->num_rows > 0) {
	$messages = [];

	while ($entry = $db_response->fetch_assoc()) {
		array_push($messages, $entry);
	}

	http_response_code(200);
	print_r(json_encode($messages));
}
else {
	http_response_code(404);
	print_r(json_encode(['error' => 'No messages were loaded.']));
}
