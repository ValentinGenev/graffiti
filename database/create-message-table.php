<?php
/**
 * Creates the message table
 */


include_once 'connect.php';
include_once 'class-table-actions.php';


// Create connection
$db_controller = new Table_Actions($connection);
echo "<p>{$db_controller->create_messages_table()}</p>";
