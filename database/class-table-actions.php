<?php

/**
 * Handles the database interactions
 */
class Table_Actions {
	private $db_connection;

	function __construct($db_connection) {
		$this->db_connection	= $db_connection;
	}

	function create_messages_table() {
		$messages_table = '
			CREATE TABLE IF NOT EXISTS Messages (
				id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
				poster VARCHAR(256),
				post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				message TEXT
			);
			CREATE INDEX poster_index ON Messages (poster(256));
		';

		if ($this->db_connection->multi_query($messages_table)) {
			return 'The table is ready.';
		}
		else {
			return 'Error creating table: ' . $this->db_connection->error;
		}
	}

	function create_messages_entry($message) {

	}
}
