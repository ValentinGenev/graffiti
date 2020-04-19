<?php
/**
 * Connects to the database
 */


include_once 'creds.php';
include_once 'class-controller.php';

$db_server_name = DB_SERVER_NAME;
$db_user_name		= DB_USERNAME;
$db_password    = DB_PASSWORD;
$db_name        = DB_NAME;

// Create connection
$db_controller  = new Database_Controller($db_server_name, $db_user_name, $db_password, $db_name);
$db_controller->open_connection();
echo $db_controller->check_connection();
$db_controller->close_connection();
