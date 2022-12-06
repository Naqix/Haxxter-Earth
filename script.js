
const audio = document.querySelector('audio');

playPause = () => {
	if (audio.paused) {
		audio.play()
	} else {
		audio.pause()
	}
}

document.addEventListener('keydown', function (event) {
	if (event.keyCode === 32) {
		playPause()
	}
});

