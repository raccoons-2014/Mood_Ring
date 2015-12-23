$('.welcome.show').ready(function(){
  var MoodDb = MoodDb || {};

  MoodDb.addSong = function(title, stream_url, mood, track_id, permalink_url) {
    return Promise.resolve($.ajax ({
      url: '../songs/create',
      data: {title: title, stream_url: stream_url, mood: mood, track_id: track_id, permalink_url: permalink_url},
      type: "POST"
    }));
  }

  MoodDb.getSong = function(mood) {
    return Promise.resolve($.ajax({
      url: '../songs/index',
      type: "GET",
      dataType: "json",
      data: {mood: mood}
    }));

  };
  var current_mood = $('.current_mood').data('mood');

  function AudioController(tracks) {
    this.trackObjects = tracks;
    this.trackPlaylist = [];
    this.trackTitles = [];
    this.trackNumber = 0;
    this.grabPlaylist();
    song = new Audio();
    song.crossOrigin = "anonymous";
    this.previousTime = 0;
    this.playerControls();
    this.glowingRing();
    this.progress;
    song.addEventListener("timeupdate", this.progressBar, false);
    song.addEventListener('ended', this.setNextTrack.bind(this));
    this.animate();
  }

  AudioController.prototype.initPlayer = function(current_mood) {
    song.src = '';
    Promise.resolve().then(function() {
      return MoodDb.getSong(current_mood);
      }).then(function(response) {
        colorWheel = new ParticleRing();
        init();
        animate();
        response = _.shuffle(response);
        response.unshift({stream_url: response.stream_url, title: response.title});
        this.getNewTracks(response);
        console.log("initPlayer response: ", response);
        this.displayControls();
    });
  };

  AudioController.prototype.getNewTracks = function(newTracks) {
    this.trackPlaylist = [];
    this.trackTitles = [];
    this.trackObjects = newTracks;
    this.trackNumber = 0;
    this.grabPlaylist();
    song.src = this.trackPlaylist[this.trackNumber];
    SC.get(
      "/tracks/" + this.trackObjects[this.trackNumber].track_id,
      function(track, error) {
          if (error) {
              console.log('error');
              this.setNextTrack();
          } else {
              try {
                  SC.stream(
                      '/tracks/' + track.id, function() {
                        song.play();
                      });
                } catch (err) {
                  console.log('error 2:', err);
                  this.setNextTrack();
              }
          }
      }
    );

    $('#track-title').html(this.trackTitles[this.trackNumber]);
  };

  AudioController.prototype.grabPlaylist = function() {
    for(var i = 0; i < this.trackObjects.length; i++) {
      this.trackPlaylist.push(this.trackObjects[i].stream_url + "?client_id=e67d17cea5de0deead27fed93e338691");
      this.trackTitles.push(this.trackObjects[i].title);

    }
  };

  AudioController.prototype.setNextTrack = function() {
    this.trackNumber = (this.trackNumber + 1)% this.trackPlaylist.length;
    song.src = this.trackPlaylist[this.trackNumber];
    SC.get(
      "/tracks/" + this.trackObjects[this.trackNumber].track_id,
      function(track, error) {
          if (error) {
              console.log('error 1:', error);
              this.setNextTrack();
          } else {
              try {
                  SC.stream(
                      '/tracks/' + track.id, function() {
                        song.play();
                      });
                } catch (err) {
                  console.log('error 2:', err);
                  this.setNextTrack();
              }
          }
      }
    );    $('#track-title').html(this.trackTitles[this.trackNumber]);
  };

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
    glowplayer.displayControls();
    Slides.show('chooseMood');

    MoodDb.getSong(current_mood)
    .then(function(response){
      if (typeof(colorWheel) == "undefined") {
        colorWheel = new ParticleRing();
        init();
        animate();
      }
      response = _.shuffle(response);
      console.log('response', response);
      glowplayer.getNewTracks(response);
      bringUpSearchButton();
    });
  };

  AudioController.prototype.progressBar = function() {
    if ( $( "#playlist" ).length ) {
      var progressBarWidth = document.getElementById('playlist').offsetWidth;
      var factor = progressBarWidth/song.duration;
      if (song.currentTime > 0 && Math.abs(song.currentTime - this.previousTime ) > 0.25) {
        var width = song.currentTime * factor;
        $("#progressBar").css("width", width);
        this.previousTime = song.currentTime;
      }
    }
  };

  AudioController.prototype.animate = function() {
    var width = this.progressBar();
    $('#progress').css('width', width +' px');
    window.requestAnimationFrame(this.animate.bind(this));
  };


  $('.moodChoice').on("click", function(event){
    event.preventDefault();
    var mood = this.id;
    Promise.resolve().then(function() {
      $('#songList').empty();
      return MoodDb.addSong(title, stream_url, mood, track_id, permalink_url);
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
        response.unshift({stream_url: stream_url, title: title, track_id: track_id, permalink_url: permalink_url});
        player.getNewTracks(response);
        player.displayControls();
      })
    })
  });

  player = new AudioController([]) || player;
  player.initPlayer(current_mood);

});

