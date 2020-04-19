<?php

/**
 * Handles the database interactions
 */
class Database_Controller {
	private $db_server_name;
	private $db_user_name;
	private $db_password;
	private $db_name;
	private $db_connection;

	function __construct($db_server_name, $db_user_name, $db_password, $db_name) {
		$this->db_server_name	= $db_server_name;
		$this->db_user_name		= $db_user_name;
		$this->db_password		= $db_password;
		$this->db_name				= $db_name;
	}

	function open_connection() {
		$connection = mysqli_connect($this->db_server_name, $this->db_user_name, $this->db_password, $this->db_name);

		if ($connection) {
			$this->$db_connection;

			return 'Connection established.';
		}
		else {
			return 'Connection failed: ' . mysqli_connect_error();
		}
	}

	function close_connection() {
		$this->db_connection->close();

		return 'Connection closed';
	}

	function check_connection() {
		return $this->db_connection;
	}

	function create_messages_table() {
		$messages_table = '
			CREATE TABLE IF NOT EXISTS `messages` (
				id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
				post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				message TEXT
			)
		';

		if ($this->db_connection->query($messages_table) === true) {
			return 'The table is ready.';
		}
		else {
			return 'Error creating table: ' . $this->db_connection->error;
		}
	}

	function create_messages_entry($message) {

	}
}
