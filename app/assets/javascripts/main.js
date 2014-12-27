$(document).ready(function(){
  genre_choice = ""
  tracknames = [];
  jQuery.ajaxSettings.traditional = true;
  var apiKey = 'Y8IIRKVUCI9ZLESEU';

  function populateTrackList(tracks){
    for (i = 0; i < tracks.length; i++) {
      tracknames.push( tracks[i].artist_name + " " + tracks[i].title );
    }
  };

  $('button.genre').click(function(e){
      genre_choice = this.id
      $('#genre-page').hide();
      $('#mood-page').show();
  });

  $('button.emotion').click(function(e){
    tracknames = [];
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(this.id)
  });

  $('#mood_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(mood_input.value)
  });
})
