// Selects audio element and play/pause button
const audio = document.querySelector('.audio');
const play_pause_btn = document.querySelector('.play_pause_btn');

// Creates progress bar for time bar element
const time_bar = document.querySelector('.time_bar');
const progress = document.createElement('div');
progress.classList.add('progress');
time_bar.appendChild(progress);

// Selects time element to display current audio time
const time = document.querySelector('.time');

// Adds event listener for timeupdate to update progress bar and current time display
audio.addEventListener('timeupdate', function () {
    // calculate percentage of audio played and set width of progress bar
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';

    // calculate minutes and seconds played and display in time element
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime - minutes * 60);
    time.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
});

// Selects the forward and backward buttons
const forward_btn = document.querySelector('.forward_btn');
const backward_btn = document.querySelector('.backward_btn');

// Adds event listener to the play/pause button to play/pause the audio
play_pause_btn.addEventListener('click', function () {
    // Check if audio is paused
    if (audio.paused) {
        // If paused, play the audio
        audio.play();
        // Update the button text to show pause icon
        play_pause_btn.innerHTML = '&#9612;&#9612;';
    } else {
        // If not paused, pause the audio
        audio.pause();
        // Update the button text to show play icon
        play_pause_btn.innerHTML = '&#9654;';
    }
});

// Adds event listener to the forward button to move audio forward by 10 seconds
forward_btn.addEventListener('click', function () {
    // Update the audio current time by 10 seconds
    audio.currentTime += 10;
});

// Adds event listener to the backward button to move audio backward by 10 seconds
backward_btn.addEventListener('click', function () {
    // Update the audio current time by -10 seconds
    audio.currentTime -= 10;
});

// Listens for keydown events and perform actions based on keycode
document.addEventListener('keydown', function (e) {
    // If left arrow key is pressed, decrease current time by 10 seconds
    if (e.keyCode == 37) {
        audio.currentTime -= 10;
    }
    // If right arrow key is pressed, increase current time by 10 seconds
    else if (e.keyCode == 39) {
        audio.currentTime += 10;
    }

    // If spacebar is pressed, toggle play/pause on audio
    if (e.keyCode === 32) {
        if (audio.paused) {
            audio.play();
            play_pause_btn.innerHTML = '&#9612;&#9612;';
        } else {
            audio.pause();
            play_pause_btn.innerHTML = '&#9654;';
        }
    }
});

// Listens for clicks on the time bar and set audio current time based on click position
time_bar.addEventListener('click', function (e) {
    // Get width of time bar in pixels
    const width = time_bar.offsetWidth;
    // Calculate click position as percentage of time bar width
    const percent = (e.offsetX / width) * 100;
    // Set audio current time based on percentage of total duration
    audio.currentTime = (percent / 100) * audio.duration;
});


// Selects the time display element
const time_display = document.querySelector('.time_display');

// Create a variable to track whether the mouse is being dragged
let is_dragging = false;

// Listens for mousemove events on the time bar
time_bar.addEventListener('mousemove', function (e) {
    // Calculate the width of the time bar and the percentage of the mouse position
    const width = time_bar.offsetWidth;
    const percent = (e.offsetX / width) * 100;

    // Calculate the minutes and seconds based on the percentage of the audio duration
    const minutes = Math.floor((percent / 100) * audio.duration / 60);
    const seconds = Math.floor((percent / 100) * audio.duration - minutes * 60);

    // Update the time display with the calculated minutes and seconds
    time_display.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    // If the mouse is being dragged, update the audio current time
    if (is_dragging) {
        // Calculate the percentage of the time bar and set the audio current time
        const width = time_bar.offsetWidth;
        const percent = (e.offsetX / width) * 100;
        audio.currentTime = (percent / 100) * audio.duration;
    }
});

// Adds an event listener to the time bar for when the mouse is released
time_bar.addEventListener('mouseup', function () {
    is_dragging = false;
});

// Adds an event listener to the time bar for when the mouse leaves the element
time_bar.addEventListener('mouseout', function () {
    // Clear the time display
    time_display.innerHTML = '';
});

// Adds an event listener to the time bar for when the mouse enters the element
time_bar.addEventListener('mousein', function () {
    // Update the time display with the current time
    time_display.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
});