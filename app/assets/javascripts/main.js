$(document).ready(function(){

    init();
    animate();

  $('#options').click(function(e) {
    $('#options').hide();
    $('#mood-page').show();
  });

  $('#close').click(function(e) {
    $('#mood-page').hide();
    $('#options').show();
  });

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
    setTimeout(function(){tagPlaylist.setCurrentTrack();},1000);
    setTimeout(function(){tagPlaylist.streamSong()},1000);
  });

  $('#mood_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(mood_input.value)
    setTimeout(function(){tagPlaylist.setCurrentTrack();},1000);
    setTimeout(function(){tagPlaylist.streamSong()},1000);
  });

  $('#connect').on('click', function(){
    connectToSoundcloud();
  });
})
