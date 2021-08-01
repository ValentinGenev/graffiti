window.addEventListener("load", () => {
	const SCREEN_HEIGHT = getScreenHeight()
	const BODY = document.querySelector('body')
	const MESSAGE_CONTAINER = document.querySelector('#messages_container')


	// Initial GET call
	customGetFetch({ count: 10 })
		.then(messages => {
			showMessages(messages)
			return messages
		})
		.then(() => fillScreenWithMessages(BODY, SCREEN_HEIGHT))


	// Load more messages when near the bottom of the list
	const ENDLESS_SCROLL = throttle(() => {
		if (window.pageYOffset + SCREEN_HEIGHT > BODY.offsetHeight - 100) {
			window.removeEventListener('scroll', ENDLESS_SCROLL)

			customGetFetch({ count: 10, oldest_loaded: MESSAGE_CONTAINER.dataset.oldestLoadedMessage })
				.then(response => {
					if ('error' in response) {
						console.warn(response.error)
						return null
					}

					showMessages(response)
					window.addEventListener('scroll', ENDLESS_SCROLL)
				})
		}
	}, 50)

	window.addEventListener('scroll', ENDLESS_SCROLL)


	// Back on the page load
	window.addEventListener('focus', () => {
		let lastPost = document.querySelector('.message')

		customGetFetch({ count: 10, newest_loaded: lastPost.id })
			.then((response) => {
				'error' in response ? console.warn(response.error) : showNewestMessages(response)
			})
	})
})


/**
 * Fills the screen with messages
 *
 * @param {Node} body
 * @param {Number} screenHeight
 */
function fillScreenWithMessages(body, screenHeight) {
	let oldestLoadedMessage = document.querySelector('#messages_container').dataset.oldestLoadedMessage
	let scrollOffset = screenHeight + 200

	customGetFetch({ count: 10, oldest_loaded: oldestLoadedMessage })
		.then(response => {
			if ('error' in response) {
				console.warn(response.error)
				return null
			}

			showMessages(response)
			return response
		})
		.then(result => {
			if (body.offsetHeight < scrollOffset && result) {
				fillScreenWithMessages(body, screenHeight)
			}
		})
}


/**
 * Show messages
 *
 * @param {JSON} messages
 */
function showMessages(messages) {
	const messagesContainer = document.querySelector('#messages_container')

	messagesContainer.dataset.oldestLoadedMessage = messages[messages.length - 1].id
	messages.forEach(entry => messagesContainer.appendChild(renderMessageEntry(entry, 'old')))
}


/**
 * Shows unloaded new messages on event
 *
 * @param {JSON} messages
 */
function showNewestMessages(messages) {
	messages.forEach(entry => {
		document.querySelector('#messages_container')?.
			insertBefore(
				renderMessageEntry(entry, 'missed old'),
				document.querySelector('.message')
			)
	})
}


/**
 * Sends GET AJAX request to the backend
 *
 * @param		{Object}		data
 * @param		{String}		action
 * @return	{Promise}		fetchResponse
 */
async function customGetFetch(data, action = './database/get-messages.php') {
	let urlWithParams = `${action}?`
	Object.keys(data).forEach(param => urlWithParams += `${param}=${data[param]}&`)

	const getRequest = await fetch(urlWithParams, { method: 'GET' })

	return getRequest.status === 200 ?
		await getRequest.json() :
		{ error: getRequest.statusText }
}
