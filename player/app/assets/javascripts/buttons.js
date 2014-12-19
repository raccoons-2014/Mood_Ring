$(document).ready(function(){

  var CURRENT_TRACK = '';

  function play() {
    $('#pause').click(function(event) {
      sound.pause();
    });
  }

  $('.emotion').click( function(event) {
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    SC.get('/tracks', { tags: this.id }, function(tracks) {
      var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
      CURRENT_TRACK = 'https://api.soundcloud.com/tracks/' + ID + '/stream';
    });
    setTimeout(function(){SC.stream(CURRENT_TRACK, function(sound) {
      sound.play();
      $('#pause').click(function(event) {
        sound.pause();
      });

      $('#play').click(function(event) {
        sound.resume();
      });
    })}, 100);
  });
});
