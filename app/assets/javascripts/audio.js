//perhaps need to delete other instance of AudioCOntroller when
//switching moods in main.js

function AudioController(audioSelector) {
  //find the selector for the audio player
  //maybe selector play buttons, progressbar, etc.
}

AudioController.prototype.grabPlaylist = function() {
//do AvticeRecord query gram stream URLs from db and
//populate track info
// also populate track info aka title and maybe url to access favorites?
};

AudioController.prototype.setCurrentTrack = function() {
//update Track info in margquee
//progress to current song or next song in array of stream urls
};

AudioController.prototype.updateVisualizerSource = function() {
// call Vizualizer and udate song_url
};

AudioController.prototype.playSong = function () {
//should call update Visualizer Source
//and control player play button
};

AudioController.prototype.pauseSong = function() {
//pause song. and pause Visualizer.
};

AudioController.prototype.progressBar = function() {
//self explanatory
}
