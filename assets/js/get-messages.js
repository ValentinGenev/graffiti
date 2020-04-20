window.addEventListener("load", () => {
	const MESSAGES_CONTAINER = document.querySelector('#messages_container')

	sendGetAjax(MESSAGES_CONTAINER.dataset.action, showMEssages);
})


/**
 * Show messages
 *
 * @param {Object} xhr
 */
function showMEssages(xhr) {
	console.log(xhr)
}


/**
 * Sends GET AJAX request to the backend
 *
 * @param {Function} callback
 */
function sendGetAjax(action, callback = (xhr) => console.log(xhr)) {
  jQuery.ajax({
    method: 'GET',
    type:   'JSON',
    url:    action,

    complete(xhr) {
      callback(xhr)
    },
  })
}
