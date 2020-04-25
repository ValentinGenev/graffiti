<?php
/**
 * Helper functions are declared here.
 */


/**
 * Checks if last post and the current post are
 * withing the time limit.
 *
 * @param {Array} $last_post
 * @param {Number} $time_limit
 * @return {Bool} $is_spammy
 */
function check_if_poster_is_spammy($last_post, $time_limit = 2) {
	$last_post_date			= $last_post['post_date'];
	$current_post_date	= date('Y-m-d H:m:s');

	// Checks if last post was less than n minutes ago:
	return (strtotime($current_post_date) - strtotime($last_post_date)) / 60 < $time_limit ? true : false;
}
