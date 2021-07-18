/**
 * Gets the screen height and width
 */
function getScreenHeight() {
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
function getScreenWidth() {
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}


/**
 * The throttle function
 * Many thanks to Jonathan Sampson
 * https://jsfiddle.net/jonathansampson/m7G64/
 *
 * @param {Function} callback
 * @param {Number} limit
 */
function throttle(callback, limit) {
	let wait = false

	return () => {
		if (!wait) {
			callback.call()
			wait = true
			setTimeout(() => wait = false, limit)
		}
	}
}
