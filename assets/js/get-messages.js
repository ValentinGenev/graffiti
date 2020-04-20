window.addEventListener("load", () => {
	sendGetAjax('database/get-messages.php', { count: 10 }, showMEssages);
})


/**
 * Show messages
 *
 * @param {Object} xhr
 */
function showMEssages(xhr) {
	document.querySelector('#messages_container').innerText = xhr.responseText
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
