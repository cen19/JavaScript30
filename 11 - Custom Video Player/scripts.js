// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// build out functions

const togglePlay = function(e) {
  console.log(e);
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const toggleFullscreen = function() {
  if (!document.webkitIsFullScreen) {
    player.webkitRequestFullScreen();
  } else {
    document.webkitExitFullscreen();
  }
};

// const updateFullScreenButton = function() {
//   const icon = 
// }

const updateButton = function() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};

const skip = function() {
  const offset = Number(this.dataset.skip);
  video.currentTime = video.currentTime + offset;
};

const updateProgressFilled = function() {
  const progressFilled = (this.currentTime / this.duration) * 100;
  progressBar.style['flex-basis'] = `${progressFilled}%`;
};

const seekPlace = function(e) {
  const place = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = place;
};

const handleRangeChange = function() {
  video[this.name] = this.value;
}; 
// hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgressFilled);

toggle.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('click', seekPlace);
progress.addEventListener('mousemove', (e) => mousedown && seekPlace(e));
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(range => {
  range.addEventListener('change', handleRangeChange);
});
ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeChange);
});
fullscreen.addEventListener('click', toggleFullscreen);