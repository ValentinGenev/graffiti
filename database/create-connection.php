<?php
/**
 * Creates the message table
 */


include_once 'class-connection.php';
include_once '../env/env.php';

$db_connection	= new Database_Connection(DB_SERVER_NAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
$connection			= $db_connection->open_connection();
