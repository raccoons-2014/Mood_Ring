//to control player and visualizer at the same time
//'https://api.soundcloud.com/tracks/146159376/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6','https://api.soundcloud.com/tracks/96379023/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6', 'https://api.soundcloud.com/tracks/120682891/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6'
function AudioController(tracks) {
  this.trackObjects = tracks;
  this.trackPlaylist = [];
  this.trackTitles = [];
  this.trackNumber = 0;
  this.grabPlaylist();
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
  this.progress;
    song.addEventListener("timeupdate", progressBar, false);
}

AudioController.prototype.getNewTracks = function(newTracks) {
  this.trackPlaylist = [];
  this.trackTitles = [];
  this.trackObjects = newTracks;
  this.trackNumber = 0;
  this.grabPlaylist();
  song.src = this.trackPlaylist[this.trackNumber];
  source.mediaElement.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
};


AudioController.prototype.playNewSong = function(streamUrl, trackTitle, moodPlaylist) {
  this.trackObjects = moodPlaylist;
  this.grabPlaylist();
  this.trackPlaylist;
  song.src = (streamUrl+ "?client_id=c751293c35f7cb00b48ee6383ea84aa6");
  $('#track-title').html(trackTitle);
  source.mediaElement.play();
  song.addEventListener('ended', this.getNewTracks(moodPlaylist).bind(this));
};

AudioController.prototype.grabPlaylist = function() {
  for(var i = 0; i < this.trackObjects.length; i++) {
  this.trackPlaylist.push(this.trackObjects[i].stream_url + "?client_id=c751293c35f7cb00b48ee6383ea84aa6");
  this.trackTitles.push(this.trackObjects[i].title);
 }
};

AudioController.prototype.setNextTrack = function() {
    this.trackNumber = (this.trackNumber + 1)% this.trackPlaylist.length;
    song.src = this.trackPlaylist[this.trackNumber];
    source.mediaElement.play();
    $('#track-title').html(this.trackTitles[this.trackNumber]);
};

AudioController.prototype.setUpSource = function (song_url) {
  song.src = song_url;
  source = this.context.createMediaElementSource(song);
  source.connect(this.context.destination);
  source.connect(this.analyser);
  source.mediaElement.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
  song.addEventListener('ended', this.setNextTrack.bind(this));

}

AudioController.prototype.getFrequencyData = function() {
  this.analyser.getByteFrequencyData(this.dataArray);
    for(var i = 0; i < this.bufferLength; i++) {
      averageFrequency += this.dataArray[i];
    };
  //find average
  averageFrequency = averageFrequency / this.bufferLength;
  return averageFrequency;
}

AudioController.prototype.playerControls = function () {
  $("#play").click(function(){
     source.mediaElement.play();
     $("#play").css("visibility", "hidden");
     $("#pause").css("visibility", "visible");
  });

  $("#pause").click(function(){
     source.mediaElement.pause();
      $("#pause").css("visibility", "hidden");
      $("#play").css("visibility", "visible");

  });

  $("#next").click(function(){
    this.setNextTrack();
  }.bind(this));

};

AudioController.prototype.progressBar = function() {
  var progressBarWidth = document.getElementById('playlist').offsetWidth;
  var factor = progressBarWidth/song.duration;
  if (song.currentTime > 0 ) {
   var width = song.currentTime * factor;
  }
  $("#progressBar").css("width", width);
}

