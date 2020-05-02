window.addEventListener("load", () => {
	const NEW_MESSAGE = document.querySelector('#new_message')

	NEW_MESSAGE.addEventListener('submit', event => {
		event.preventDefault()

		postFetch(NEW_MESSAGE, handleResponse)
		.then(({ lastMessage }) => {
			showPostersMessage(lastMessage)
		})
	})
})


/**
 * Show poster's last message
 *
 * @param {JSON} message
 */
function showPostersMessage(message) {
	const MESSAGE_CONTAINER	= document.querySelector('#messages_container')

	MESSAGE_CONTAINER.insertBefore(renderMessageEntry(message), MESSAGE_CONTAINER.firstChild)
	MESSAGE_CONTAINER.firstChild.classList.add('latest')
}


/**
 * Shows users the server response
 *
 * @param {String} responseText
 */
function handleResponse(responseText) {
	document.querySelector('#new_message .response').innerText = responseText
}


/**
 * Sends POST AJAX request to the backend
 *
 * @param {Node} form
 * @param {Function} callback
 */
function postFetch(form, callback = (responseText) => console.log(responseText)) {
	const INPUT_FIELDS		= form.querySelectorAll('input:not([type=submit])')
	const TEXTAREA_FIELD	= form.querySelectorAll('textarea')
	let formData					= new FormData()


	// Get all fields' values
	INPUT_FIELDS.forEach(field => formData.append(field.getAttribute('name'), field.value))
	if (TEXTAREA_FIELD) TEXTAREA_FIELD.forEach(text => formData.append(text.getAttribute('name'), text.value))


	form.classList.toggle('loading')

	return new Promise((resolve, reject) => {
		fetch(form.getAttribute('action'), {
			method: 	'POST',
			body:			formData,
		})
		.then(response => {
			if (response.status === 200) {
				form.reset()
			}

			return response.text()
		})
		.then(responseText => {
			form.classList.toggle('loading')

			const { last_message, response_message } = JSON.parse(responseText)

			callback(response_message)
			resolve({ lastMessage: last_message, responseText: response_message })
		})
		.catch(reason => {
			callback(reason)
			reject({ responseText: reason })
		})
	})
}
