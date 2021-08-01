window.addEventListener("load", () => {
	const messageForm = document.querySelector('#new_message')
	const messagesContainer = document.querySelector('#messages_container')

	messageForm.addEventListener('submit', async event => {
		event.preventDefault()
		messageForm.classList.toggle('loading')

		const postResponse = await postFormData(messageForm)

		if (!Boolean('error' in postResponse)) {
			document.querySelectorAll('.yours').forEach(message => message.classList.add('old'))
			messageForm.reset()

			const { postedMessage } = postResponse

			messagesContainer.insertBefore(renderMessageEntry(postedMessage), messagesContainer.firstChild)
			messagesContainer.firstChild.classList.add('yours')

			// Render messages by other users if there are any
			const firstOldMessage = document.querySelector('.message.old')
			const unloadedMessages = (postedMessage.id - firstOldMessage.id) - 1 // the difference between two IDs has the value of minimum 1

			if (unloadedMessages !== 0) {
				const loadMoreButton = renderLoadMore(unloadedMessages)

				loadMoreButton.addEventListener('click', function () {
					customGetFetch({ count: unloadedMessages, oldest_loaded: postedMessage.id }, showNewerMessages)
					this.remove()
				})

				messagesContainer.insertBefore(loadMoreButton, firstOldMessage)
			}
		}

		document.querySelector('#new_message .response').innerText = postResponse.error ? postResponse.error : postResponse.responseMessage
		messageForm.classList.toggle('loading')
	})
})


/**
 * Submits a form and sends a POST request
 *
 * @param {Node} form
 * @returns {JSON}
 */
async function postFormData(form) {
	const fields = form.querySelectorAll('input:not([type=submit]), textarea')
	const formData = new FormData()

	fields?.forEach(field => formData.append(field.getAttribute('name'), field.value))

	const postRequest = await fetch(form.getAttribute('action'), {
		method: 'POST',
		body: formData,
	})

	return await postRequest.json()
}
