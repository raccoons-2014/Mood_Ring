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

  $('#happy').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#sad').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);

  });

  $('#angry').click(function(e){
      if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#mood_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(mood_input.value)
    currTrack = tracknames[0];
    playSong(currTrack);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#connect').on('click', function(){
    connectToSoundcloud();
  });
})

