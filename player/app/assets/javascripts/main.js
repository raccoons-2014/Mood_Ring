$(document).ready(function(){
  $('#happy').click(function(e){
    e.preventDefault();
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
    e.preventDefault();
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);

  });

  $('#angry').click(function(e){
      if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#genre_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(landing_genre.value);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#connect').on('click', function(){
    connectToSoundcloud();
  });
})