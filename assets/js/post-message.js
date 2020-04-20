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
 * @param {Object} xhr
 */
function handleResponse(xhr) {
	document.querySelector('#new_message .response').innerText = xhr.responseText
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
	let formData					= {}

	INPUT_FIELDS.forEach(field => formData[field.getAttribute('name')] = field.value)
	if (TEXTAREA_FIELD) TEXTAREA_FIELD.forEach(text => formData[text.getAttribute('name')] = text.value)


  jQuery.ajax({
    method: 'POST',
    type:   'JSON',
    url:    form.getAttribute('action'),
    data:   formData,

    beforeSend() {
      form.classList.toggle('loading')
    },
    success(response) {
      form.reset()
    },
    error(xhr) {
      console.log(xhr.responseText)
    },
    complete(xhr) {
      form.classList.toggle('loading')
      callback(xhr)
    },
  })
}
