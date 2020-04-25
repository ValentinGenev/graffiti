/**
 * Creates the markup of a single entry
 *
 * @param {Object} entry
 * @returns {Node} entry
 */
function renderMessageEntry(entry) {
	const { id, post_date, poster, message } = entry

	let entryContainer				= document.createElement('div')
	entryContainer.id					= id
	entryContainer.className	= 'message'
	entryContainer.innerText	= message

	let entryPoster						= document.createElement('span')
	entryPoster.className			= 'message-poster'
	entryPoster.innerText			= poster
	entryContainer.appendChild(entryPoster)

	let entryDate							= document.createElement('span')
	entryDate.className			 	= 'message-date'
	entryDate.innerText				= post_date
	entryContainer.appendChild(entryDate)

	return entryContainer
}
