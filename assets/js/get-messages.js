window.addEventListener("load", () => {
	sendGetAjax('database/get-messages.php', { count: 10 }, showMessages);
})


/**
 * Show messages
 *
 * @param {Object} xhr
 */
function showMessages(xhr) {
	const { status, responseText } = xhr
	const MESSAGE_CONTAINER = document.querySelector('#messages_container')

	if (status === 200) {
		JSON.parse(responseText).forEach(entry => {
			MESSAGE_CONTAINER.appendChild(renderMessageEntry(entry))
		});
	}
	else {
		console.log(responseText)
	}
}


/**
 * Sends GET AJAX request to the backend
 *
 * @param {Function} callback
 */
function sendGetAjax(action, data, callback = (xhr) => console.log(xhr)) {
  jQuery.ajax({
    method: 'GET',
    type:   'JSON',
		url:    action,
		data:		data,

    complete(xhr) {
      callback(xhr)
    },
  })
}
