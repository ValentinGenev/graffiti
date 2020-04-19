<?php

/**
 * Handles the database connection
 */
class Database_Connection {
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
			$this->db_connection = $connection;

			return $this->db_connection;
		}
		else {
			return 'Connection failed: ' . mysqli_connect_error();
		}
	}

	function close_connection() {
		$this->db_connection->close();

		return 'Connection closed';
	}
}
