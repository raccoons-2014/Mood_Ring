$(document).ready(function(){


  $('button.genre').click(function(e){
    genre_choice = this.id
    $('#genre-page').hide();
    $('#mood-page').show();
  });

  $('button.emotion').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(this.id)
    setTimeout(function(){tagPlaylist.setCurrentTrack();},100);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#mood_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(mood_input.value)
    setTimeout(function(){tagPlaylist.setCurrentTrack();},100);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });
})

  $('#connect').on('click', function(){
    connectToSoundcloud();
