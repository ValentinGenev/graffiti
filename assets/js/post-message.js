window.addEventListener("load", () => {
	const NEW_MESSAGE = document.querySelector('#new_message')

	NEW_MESSAGE.addEventListener('submit', event => {
		event.preventDefault()

		sendPostAjax(NEW_MESSAGE, handleResponse)
	})
})


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
function sendPostAjax(form, callback = (xhr) => console.log(xhr)) {
	const INPUT_FIELDS		= form.querySelectorAll('input:not([type=submit])')
	const TEXTAREA_FIELD	= form.querySelectorAll('textarea')
	let formData					= new FormData()

	INPUT_FIELDS.forEach(field => formData.append(field.getAttribute('name'), field.value))
	if (TEXTAREA_FIELD) TEXTAREA_FIELD.forEach(text => formData.append(text.getAttribute('name'), text.value))


	form.classList.toggle('loading')

	fetch(form.getAttribute('action'), {
		method: 	'POST',
		body:			formData,

	}).then(response => {
		if (response.status === 200) {
      form.reset()
		}

		return response.text()

	}).then(response => {
		form.classList.toggle('loading')

		callback(response)
	})
}
