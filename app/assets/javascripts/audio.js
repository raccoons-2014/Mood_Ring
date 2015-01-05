//perhaps need to delete other instance of AudioCOntroller when
//switching moods in main.js

function AudioController() {
  //find the selector for the audio player
  //maybe selector play buttons, progressbar, etc.
  this.trackPlaylist = ['https://api.soundcloud.com/tracks/146159376/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6','https://api.soundcloud.com/tracks/96379023/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6', 'https://api.soundcloud.com/tracks/120682891/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6'];
  this.trackTitles = [];
  this.currentTrackUrl = 'https://api.soundcloud.com/tracks/184210017/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6';
  this.currentTrackTitle = "";
  this.trackCount = this.trackPlaylist.length;
  this.trackNumber = 0;

  // Vizualizer / Music Analyzer
  this.context = new webkitAudioContext();
  song = new Audio();
  this.analyser = this.context.createAnalyser();
       this.analyser.fftSize = 2048;
  this.setUpSource(this.trackPlaylist[this.trackNumber]);
  this.bufferLength = this.analyser.frequencyBinCount;
  this.dataArray = new Uint8Array(this.bufferLength);
  averageFrequency = 1;

  this.playerControls();
}

AudioController.prototype.grabPlaylist = function() {
//do AvticeRecord query gram stream URLs from db and
//populate track info
// also populate track info aka title and maybe url to access favorites?
};

AudioController.prototype.setNextTrack = function() {
//update Track info in margquee
//progress to current song or next song in array of stream urls

if ((this.trackNumber+1) < this.trackCount) {
  this.trackNumber++;
  song.src = this.trackPlaylist[this.trackNumber];
  source.mediaElement.play();
} else{
  this.trackNumber = 0;
  song.src = this.trackPlaylist[this.trackNumber];
  source.mediaElement.play();
}
};

AudioController.prototype.setUpSource = function (song_url) {
  song.src = song_url;
  source = this.context.createMediaElementSource(song);
  source.connect(this.context.destination);
  source.connect(this.analyser);
  source.mediaElement.play();

}

AudioController.prototype.changePlayerSource = function() {
  var source = document.getElementById("mp3source");
  source.src = this.currentTrackUrl;
};

// call Vizualizer and udate song_url
AudioController.prototype.updateVisualizerSource = function() {

};

AudioController.prototype.getFrequencyData = function() {
  this.analyser.getByteFrequencyData(this.dataArray);

      for(var i = 0; i < this.bufferLength; i++) {
        averageFrequency += this.dataArray[i];
      };

  //find average
  averageFrequency = averageFrequency / this.bufferLength;
  return averageFrequency;
}


//should call update Visualizer Source
//and control player play button
AudioController.prototype.playerControls = function () {
$("#play").click(function(){
   source.mediaElement.play();
});

$("#pause").click(function(){
   source.mediaElement.pause();
});

$("#next").click(function(){
  console.log("next");
  this.setNextTrack();
}.bind(this));

};



AudioController.prototype.progressBar = function() {
//self explanatory
}
