$(document).ready(function(){
  var genre_choice = ""
  $('button.genre').click(function(e){
      e.preventDefault();
      genre_choice = this.id
      $('#genre-page').hide();
      $('#mood-page').show();
  });

  $('#happy').click(function(e){
    e.preventDefault();
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
    e.preventDefault();
    tagPlaylist = new PlayerWidget(this.id, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);

  });

  $('#angry').click(function(e){
      if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(this.id, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#genre_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(landing_genre.value, genre_choice);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });
})