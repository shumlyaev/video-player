let playButton;
let muteButton;
let volumeRange;
let progress;
let progressBar;
let video;
let isPlaying;
let isMute;

playButton = document.querySelector('#play');
playButton.onclick = play;
muteButton = document.querySelector('#mute');
muteButton.onclick = mute;
volumeRange = document.querySelector('#volume');
volumeRange.oninput = changeVolume;
video = document.querySelector('#video');
video.ontimeupdate = progressUpdate;
progressBar = document.querySelector('.progress-bar');
progress = document.querySelector('.progress');
progress.onclick = videoRewind;

isPlaying = false;
isMute = false;

function play() {
    if (!isPlaying) {
        video.play();
        isPlaying = true;
        playButton.innerHTML = '<img src="icons/pause.svg" style="width:14px;">';
    } else {
        video.pause();
        isPlaying = false;
        playButton.innerHTML = '<img src="icons/play.svg" style="width:14px;">';
    }
}
function changeVolume() {
    if (!isMute)
        video.volume = volumeRange.value / volumeRange.max;
}
function mute() {
    if (!isMute) {
        video.volume = 0;
        isMute = true;
        muteButton.innerHTML = '<img src="icons/mute.svg" style="width:18px;"></img>';
    } else {
        video.volume = volumeRange.value / volumeRange.max;
        isMute = false;
        muteButton.innerHTML = '<img src="icons/speaker.svg" style="width:21px;">';
    }
}
function videoRewind() {
    progressBar.setAttribute("aria-valuenow", progressBar.getAttribute('aria-valuemax') * event.offsetX / progress.offsetWidth);
    progressBar.style.width = progressBar.getAttribute('aria-valuenow') + "%";
    video.currentTime = progressBar.getAttribute('aria-valuenow') * video.duration / progressBar.getAttribute('aria-valuemax');
    
}
function progressUpdate() {
    progressBar.setAttribute("aria-valuenow", progressBar.getAttribute('aria-valuemax') * video.currentTime / video.duration);
    progressBar.style.width = progressBar.getAttribute('aria-valuenow') + "%";
    if (video.currentTime == video.duration) {
        isPlaying = false;
        playButton.innerHTML = '<img src="icons/play.svg" style="width:14px;">';
    }
}