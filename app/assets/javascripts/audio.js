// TODO: fix references to "song" to be "this.song"


//to control player and visualizer at the same time
//'https://api.soundcloud.com/tracks/146159376/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6','https://api.soundcloud.com/tracks/96379023/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6', 'https://api.soundcloud.com/tracks/120682891/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6'
function AudioController(mood) {
  this.trackObjects = [];
  this.trackPlaylist = [];
  this.trackTitles = [];
  this.trackNumber = 0;
  this.grabPlaylist();
  this.song = new Audio();

  this.playerControls();
  this.glowingRing();
  this.progress;
  this.song.addEventListener("timeupdate", progressBar, false);
  this.song.addEventListener('ended', this.getNewTracks(this.track).bind(this));
  this.song.addEventListener('ended', this.setNextTrack.bind(this));
  this.animate();
}

AudioController.prototype.getNewTracks = function(newTracks) {
  this.trackPlaylist = [];
  this.trackTitles = [];
  this.trackObjects = newTracks;
  this.trackNumber = 0;
  this.grabPlaylist();
  this.song.src = this.trackPlaylist[this.trackNumber];
  this.song.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
};


AudioController.prototype.playNewSong = function(streamUrl, trackTitle, moodPlaylist) {
  this.trackObjects = moodPlaylist;
  this.grabPlaylist();
  this.trackPlaylist;
  this.song.src = (streamUrl+ "?client_id=c751293c35f7cb00b48ee6383ea84aa6");
  $('#track-title').html(trackTitle);
  this.song.play();
};

AudioController.prototype.grabPlaylist = function() {
  for(var i = 0; i < this.trackObjects.length; i++) {
    this.trackPlaylist.push(this.trackObjects[i].stream_url + "?client_id=c751293c35f7cb00b48ee6383ea84aa6");
    this.trackTitles.push(this.trackObjects[i].title);
  }
};

AudioController.prototype.setNextTrack = function() {
  this.trackNumber = (this.trackNumber + 1)% this.trackPlaylist.length;
  this.song.src = this.trackPlaylist[this.trackNumber];
  this.song.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
};

AudioController.prototype.setUpSource = function (song_url) {
  this.song.src = song_url;
  this.song.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
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
   this.song.play();
     // TODO: Have a #playpause button that you .toggleClass('playing')
     $("#play").hide(); // css("visibility", "hidden");
     $("#pause").show(); //css("visibility", "visible");
   }.bind(this));

  $("#pause").click(function(){

    this.song.pause();
    $("#pause").css("visibility", "hidden");
    $("#play").css("visibility", "visible");
  }.bind(this));

  $("#next").click(function(){
    this.setNextTrack();
  }.bind(this))
};

AudioController.prototype.glowingRing = function() {
  var self = this;

  $('body').on("click", ".glowing-ring", function(e) {
      e.preventDefault();
    $("#home").hide();
    $('#mood-popup').hide();
    $("#visualizer").show();
    var clickedMood = $(this).data("mood");
    MoodDb.getSong(clickedMood)
    .then(function(response){
      response = _.shuffle(response);
      self.getNewTracks(response);
      if(typeof(vizualizer) == "undefined"){
        var player = new AudioController(response);
        var vizualizer = new ParticleRing(player.song);
        console.log(vizualizer)
    }
    });
  });
}

// AudioController.prototype.showMoodSelector = function() {
//   Slides.show("mood-popup")
// };

AudioController.prototype.progressBar = function() {
  var progressBarWidth = document.getElementById('playlist').offsetWidth;
  var factor = progressBarWidth/this.song.duration;
  if (this.song.currentTime > 0 ) {
   var width = this.song.currentTime * factor;
  }
  $("#progressBar").css("width", width);
};

AudioController.prototype.animate = function() {
  var width = this.progressBar();
  $('#progress').css('width', width +' px');
  window.requestAnimationFrame(this.animate.bind(this));
};

$(document).ready(function() {
  $('.moodChoice').on("click", function(event){
    event.preventDefault();
    var mood = this.id;
    Promise.resolve().then(function() {
      $('#songList').empty();
      $songMood.hide();
      $chooseMood.show();
      $enterSong.show();

      return MoodDb.getSong(mood);
    }).then(function(response){
      if (sourceCreated === true) {
        response = _.shuffle(response);
        response.unshift({stream_url: stream_url, title: title})
        viz.getNewTracks(response)
      } else {
        response = _.shuffle(response);
        response.unshift({stream_url: stream_url, title: title})
        audioPlay(response);
        sourceCreated = true;
      }
    }).catch(function(error) {
      // TODO: Error handling
    });
  });
});

