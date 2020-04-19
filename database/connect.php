<?php
/**
 * Creates the message table
 */


include_once 'class-connection.php';
include_once 'creds.php';

$db_server_name = DB_SERVER_NAME;
$db_user_name		= DB_USERNAME;
$db_password    = DB_PASSWORD;
$db_name        = DB_NAME;
$db_connection	= new Database_Connection($db_server_name, $db_user_name, $db_password, $db_name);
$connection			= $db_connection->open_connection();
