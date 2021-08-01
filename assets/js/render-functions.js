/**
 * Creates the markup of a single entry
 *
 * @param {Object} entry
 * @param {String} className
 * @returns {Node} entryContainer
 */
function renderMessageEntry(entry, className = '') {
	const { id, post_date, poster, message } = entry

	let entryContainer = document.createElement('div')
	entryContainer.id = id
	entryContainer.className = className !== '' ? `message ${className}` : 'message'
	entryContainer.innerHTML = message

	let entryPoster = document.createElement('span')
	entryPoster.className = poster !== 'Anonymous' ? 'message-poster' : 'message-poster hide'
	entryPoster.innerText = poster
	entryContainer.appendChild(entryPoster)

	let entryDate = document.createElement('small')
	entryDate.className = 'message-date'
	entryDate.innerText = post_date
	entryContainer.appendChild(entryDate)

	return entryContainer
}

/**
 *
 * @param {Number} messagesCount
 * @returns {Node} loadMore
 */
function renderLoadMore(messagesCount) {
	let loadMore = document.createElement('button')
	loadMore.className = 'load-more button'
	loadMore.innerText = `${messagesCount} unloaded graffiti`

	return loadMore
}
