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
		$messages_table = 'CREATE TABLE IF NOT EXISTS Messages (
				id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
				post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				poster_id VARCHAR(256),
				poster TEXT,
				message TEXT
			);
			CREATE INDEX poster_index ON Messages (poster_id(256));
		';

		if ($this->db_connection->multi_query($messages_table)) {
			return 'The table is ready.';
		}
		else {
			return 'Error creating table: ' . $this->db_connection->error;
		}
	}

	function create_messages_entry($data) {
		$message	= "INSERT INTO Messages (poster_id, poster, message)
			VALUES ('{$data['poster_id']}', '{$data['poster']}', '{$data['message']}');
		";

		if ($this->db_connection->query($message)) {
			return 1;
		}
		else {
			return 'Something went wrong: ' . $this->db_connection->error;
		}
	}

	function get_messages($count, $last_loaded) {
		$where			= $last_loaded ? "WHERE id < $last_loaded " : '';
		$get_query	= "SELECT * FROM Messages $where ORDER BY id DESC LIMIT $count";
		$messages		= $this->db_connection->query($get_query);

		if ($messages) {
			return $messages;
		}
		else {
			return 'Something went wrong: ' . $this->db_connection->error;
		}
	}

	function get_last_message_by_poster($poster_id) {
		$get_query	= "SELECT post_date FROM Messages WHERE poster_id = '$poster_id' ORDER BY post_date DESC LIMIT 1";
		$message		= $this->db_connection->query($get_query);

		if ($message) {
			return $message;
		}
		else {
			return 'Something went wrong: ' . $this->db_connection->error;
		}
	}
}
