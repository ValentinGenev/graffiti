<?php
/**
 * Gets all messages
 */


include_once 'connect.php';
include_once 'class-table-actions.php';


$db_controller = new Table_Actions($connection);
var_dump($db_controller->get_messages());
