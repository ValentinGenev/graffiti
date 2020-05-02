window.addEventListener("load", () => {
	const SCREEN_HEIGHT			= getScreenHeight()
	const BODY							= document.querySelector('body')
	const MESSAGE_CONTAINER	= document.querySelector('#messages_container')

	// Initial GET call
	customGetFetch('./database/get-messages.php', { count: 10 }, showMessages)
	.then(() => {
		fillScreenWithMessages(BODY, SCREEN_HEIGHT)
	})

	// Load more messages when near the bottom of the list
	const ENDLESS_SCROLL		= throttle(() => {
		if (window.pageYOffset + SCREEN_HEIGHT > BODY.offsetHeight - 100) {
			window.removeEventListener('scroll', ENDLESS_SCROLL)

			customGetFetch('./database/get-messages.php', { count: 10, oldest_loaded: MESSAGE_CONTAINER.dataset.oldestLoadedMessage }, showMessages)
			.then(() => {
				window.addEventListener('scroll', ENDLESS_SCROLL)
			})
			.catch(({ status, responseText }) => {
				console.log(status === 404 ? 'All messages were loaded.' : responseText)
			})
		}
	}, 100)

	window.addEventListener('scroll', ENDLESS_SCROLL)
})


/**
 * Fills the screen with messages
 *
 * @param {Node} body
 * @param {Number} screenHeight
 */
function fillScreenWithMessages(body, screenHeight) {
	let oldestLoadedMessage	= document.querySelector('#messages_container').dataset.oldestLoadedMessage
	let scrollOffset			= screenHeight + 200

	customGetFetch('./database/get-messages.php', { count: 10, oldest_loaded: oldestLoadedMessage }, showMessages)
	.then(({ status }) => {
		if (body.offsetHeight < scrollOffset && status < 400) {
			fillScreenWithMessages(body, screenHeight)
		}
	})
	.catch(({ responseText }) => {
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

	MESSAGE_CONTAINER.dataset.oldestLoadedMessage = MESSAGES[MESSAGES.length - 1].id
	MESSAGES.forEach(entry => MESSAGE_CONTAINER.appendChild(renderMessageEntry(entry)))
}


/**
 * Sends GET AJAX request to the backend
 *
 * @param {Function} callback
 * @return {Promise} fetchResponse
 */
function customGetFetch(action, data, callback = (responseText) => console.log(responseText)) {
	let urlWithParams = `${action}?`
	Object.keys(data).forEach(param => urlWithParams += `${param}=${data[param]}&`)

	return new Promise((resolve, reject) => {
		fetch(urlWithParams, { method: 'GET' })
		.then(response => {
			let responseStatus = response.status

			return response.text().then(response => { return { status: responseStatus, responseText: response } })

		})
		.then(data => {
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
