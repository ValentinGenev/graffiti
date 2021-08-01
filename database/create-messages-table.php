<?php
/**
 * Creates the message table
 */


include_once 'create-connection.php';
include_once 'class-table-actions.php';


$db_controller = new Table_Actions($connection);
echo "<p>{$db_controller->create_messages_table()}</p>";
$db_connection->close_connection();
