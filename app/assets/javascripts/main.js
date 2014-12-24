$(document).ready(function(){
  var genre_choice = ""
  $('button.genre').click(function(e){
      genre_choice = this.id
      $('#genre-page').hide();
      $('#mood-page').show();
  });

  $('#happy').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#sad').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);

  });

  $('#angry').click(function(e){
      if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#genre_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(mood_input.value, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });
})