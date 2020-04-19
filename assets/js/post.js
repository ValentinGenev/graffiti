window.addEventListener("load", () => {

})


/**
 * Sends AJAX request to the backend
 *
 * @param {Node} form
 * @param {Function} callback
 * @param {Function} handleResponse
 */
function sendAJAXtoMail(form, callback = (xhr) => console.log(xhr), handleResponse = (response) => console.log(response)) {
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
      handleResponse(response)
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
