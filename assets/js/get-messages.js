window.addEventListener("load", () => {
	const BODY					= document.querySelector('body')
	const SCREEN_HEIGHT	= getScreenHeight()

	// Initial GET call
	fillScreenWithMessages(BODY, SCREEN_HEIGHT)
})


/**
 * Fills the screen with messages
 *
 * @param {Node} body
 * @param {Number} screenHeight
 * @return {Number} bodyHeight
 */
function fillScreenWithMessages(body, screenHeight) {
	let scrollOffset = screenHeight + 200

	customGetFetch('./database/get-messages.php', { count: 10 }, showMessages).then(() => {
		if (body.offsetHeight < scrollOffset) {
			fillScreenWithMessages(body, screenHeight)
		}
	}).catch(({ responseText }) => {
		console.log(responseText)
	})
}


/**
 * Show messages
 *
 * @param {JSON} messages
 */
function showMessages(messages) {
	const MESSAGE_CONTAINER	= document.querySelector('#messages_container')
	const MESSAGES					= JSON.parse(messages)

	MESSAGE_CONTAINER.dataset.lastLoadedMessage = MESSAGES[MESSAGES.length - 1].id

	MESSAGES.forEach(entry => {
		MESSAGE_CONTAINER.appendChild(renderMessageEntry(entry))
	});
}


/**
 * Sends GET AJAX request to the backend
 *
 * @param {Function} callback
 * @return {Promise} fetchResponse
 */
function customGetFetch(action, data, callback = (xhr) => console.log(xhr)) {
	let urlWithParams = `${action}?`
	Object.keys(data).forEach(param => urlWithParams += `${param}=${data[param]}&`)

	return new Promise((resolve, reject) => {
		fetch(urlWithParams, { method: 'GET' }).then(response => {
			let responseStatus = response.status

			return response.text().then(response => { return { status: responseStatus, responseText: response } })

		}).then(data => {
			if (data.status === 200) {
				callback(data.responseText)
				resolve({ status: data.status, responseText: 'Messages rendered.' })
			}
			else {
				reject({ status: data.status, responseText: data.responseText })
			}
		})
	})
}
