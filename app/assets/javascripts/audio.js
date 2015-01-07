function AudioController(tracks) {
  this.trackObjects = tracks;
  this.trackPlaylist = [];
  this.trackTitles = [];
  this.trackNumber = 0;
  this.grabPlaylist();
  song = new Audio();
  this.playerControls();
  this.glowingRing();
  this.progress;
  song.addEventListener("timeupdate", progressBar, false);
  song.addEventListener('ended', this.setNextTrack.bind(this));
  this.animate();
}

AudioController.prototype.getNewTracks = function(newTracks) {
  this.trackPlaylist = [];

  this.trackTitles = [];
  this.trackObjects = newTracks;
  this.trackNumber = 0;
  this.grabPlaylist();
  song.src = this.trackPlaylist[this.trackNumber];
  song.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
};


AudioController.prototype.playNewSong = function(streamUrl, trackTitle, moodPlaylist) {
  this.trackObjects = moodPlaylist;
  this.grabPlaylist();
  this.trackPlaylist;
  song.src = (streamUrl+ "?client_id=c751293c35f7cb00b48ee6383ea84aa6");
  $('#track-title').html(trackTitle);
  song.play();
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
  song.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
};

AudioController.prototype.setUpSource = function (song_url) {
  song.src = song_url;
  song.play();
  $('#track-title').html(this.trackTitles[this.trackNumber]);
}

AudioController.prototype.displayControls = function() {
    $("#all-controls").show()
  }


AudioController.prototype.playerControls = function () {

    $("#play").click(function(){
     song.play();
     $("#play").hide();
     $("#pause").show();
    }.bind(this));

    $("#pause").click(function(){
      song.pause();
      $("#pause").hide();
      $("#play").show();
    }.bind(this));

    $("#next").click(function(){
      this.setNextTrack();
       $("#play").hide();
       $("#pause").show();
    }.bind(this));
  };


AudioController.prototype.glowingRing = function() {
  var glowplayer = this;
  $('.glowing-ring').click(function(e) {
    e.preventDefault();
    glowplayer.displayControls();
    Slides.show('chooseMood');

    var clickedMood = $(this).data("mood");
    MoodDb.getSong(clickedMood)
    .then(function(response){
      if (typeof(colorWheel) == "undefined") {
        colorWheel = new ParticleRing();
        init();
        animate();
      }
      response = _.shuffle(response);
      glowplayer.getNewTracks(response);
      bringUpSearchButton();
    });
  });
}

AudioController.prototype.progressBar = function() {
  var progressBarWidth = document.getElementById('playlist').offsetWidth;
  var factor = progressBarWidth/song.duration;
  if (song.currentTime > 0 ) {
   var width = song.currentTime * factor;
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

      return MoodDb.addSong(title, stream_url, mood);
    }).then(function(response){
      Slides.show('chooseMood');
      bringUpSearchButton();
      Promise.resolve().then(function() {
        return MoodDb.getSong(mood);
      }).then(function(response) {
        if (typeof(colorWheel) == "undefined") {
          colorWheel = new ParticleRing();
          init();
          animate();
        }
        response = _.shuffle(response);
        response.unshift({stream_url: stream_url, title: title})
        player.getNewTracks(response);
        player.displayControls();
      })
    })
  });
});

