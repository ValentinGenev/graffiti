<?php

/**
 * Removes unwanted tags and closures from a message
 *
 * @param {string} $message
 * @return {string} $sanitized_message
 */
function sanitize_message_html($message) {
	$blacklisted_tags								= ['style', 'iframe', 'svg'];
	$message_string									= '<span class="message-content">' . $message . '</span>';
	$message_html										= new DOMDocument();
	$message_html->validateOnParse	= true;

	$message_html->loadHTML(mb_convert_encoding($message_string, 'HTML-ENTITIES', 'UTF-8'));

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
