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

	function create_messages_entry($data) {
		$message	= "
			INSERT INTO Messages (poster, message)
			VALUES ('{$data['poster']}', '{$data['message']}');
		";

		if ($this->db_connection->query($message)) {
			return 'Message sent.';
		}
		else {
			return 'Something went wrong: ' . $this->db_connection->error;
		}
	}

	function get_messages() {
		$get_query	= 'SELECT * FROM Messages';
		$posts			= $this->db_connection->query($get_query);

		if ($posts) {
			return $posts;
		}
		else {
			return 'Something went wrong: ' . $this->db_connection->error;
		}
	}
}
