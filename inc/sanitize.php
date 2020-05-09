<?php

/**
 * Removes unwanted tags and closures from a message
 *
 * @param {string} $message
 * @return {string} $sanitized_message
 */
function sanitize_message($message) {
	$blacklisted_tags								= ['style', 'iframe'];
	$message_string									= '<span class="message-content">' . $message . '</span>';
	$message_html										= new DOMDocument();
	$message_html->validateOnParse	= true;

	$message_html->loadHTML($message_string);

	foreach ($blacklisted_tags as $tag) {
		$target_nodes = $message_html->getElementsByTagName($tag);

		if ($target_nodes->length > 0) {
			// The DOM nodes should be deleted from bottom to top
			for ($i = $target_nodes->length - 1; $i >= 0; $i--) {
				$node = $target_nodes->item($i);

				$node->parentNode->removeChild($node);
			}
		}
	}

	// Gets the first span wich is the wrapper one
	$message_body = $message_html->getElementsByTagName('span')->item(0);

	return $message_html->saveHTML($message_body);
}


// <STYLE type="TEXT/CSS">.asd { color: red; }</style> <span color="red">asdasd</span> <style>.messages { color: yellow; }</style> <STYLE>.messages { color: green; }</style> <style>.messages { color: blue; }
