window.addEventListener("load", () => {
	const SCREEN_HEIGHT			= getScreenHeight()
	const BODY							= document.querySelector('body')
	const MESSAGE_CONTAINER	= document.querySelector('#messages_container')

	// Initial GET call
	customGetFetch({ count: 10 }, showMessages)
	.then(() => {
		document.querySelector('#messages_container').dataset.newestLoadedMessage = MESSAGE_CONTAINER.firstChild.id
		fillScreenWithMessages(BODY, SCREEN_HEIGHT)
	})

	// Load more messages when near the bottom of the list
	const ENDLESS_SCROLL		= throttle(() => {
		if (window.pageYOffset + SCREEN_HEIGHT > BODY.offsetHeight - 100) {
			window.removeEventListener('scroll', ENDLESS_SCROLL)

			customGetFetch({ count: 10, oldest_loaded: MESSAGE_CONTAINER.dataset.oldestLoadedMessage }, showMessages)
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
	let scrollOffset				= screenHeight + 200

	customGetFetch({ count: 10, oldest_loaded: oldestLoadedMessage }, showMessages)
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
 * Shows unloaded new messages on event
 *
 * @param {JSON} messages
 */
function showNewerPosts(messages) {
	// To do: this is now working good yet
	const MESSAGE_CONTAINER				= document.querySelector('#messages_container')
	const LATEST_ARCHIVED_MESSAGE	= document.querySelector('.message:not(.op-latest)')
	const MESSAGES								= JSON.parse(messages)

	MESSAGES.forEach(entry => {
		if (entry.id > MESSAGE_CONTAINER.dataset.newestLoadedMessage) {
			MESSAGE_CONTAINER.insertBefore(renderMessageEntry(entry), LATEST_ARCHIVED_MESSAGE)
		}
		else {
			console.log(entry.id)
		}
	})
	// To do: write a check if last message from this array had id bigger than LATEST_ARCHIVED_MESSAGE
	// and make a new request for them until all are loaded
	MESSAGE_CONTAINER.dataset.newestLoadedMessage = MESSAGES[0].id
}


/**
 * Sends GET AJAX request to the backend
 *
 * @param		{Objecet}		data
 * @param		{Function}	callback
 * @param		{String}		action
 * @return	{Promise}		fetchResponse
 */
function customGetFetch(data, callback = (responseText) => console.log(responseText), action = './database/get-messages.php') {
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
