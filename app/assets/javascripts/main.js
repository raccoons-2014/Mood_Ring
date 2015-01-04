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

  $('#go').click(function(event){
    $('#ajax').empty();
    SC.get('/tracks', {q: $('#text').val()}, function(tracks) {
      for (i = 0; i < tracks.length; i++) {
        $('#ajax').append("<input type='radio' name='song' value =" + tracks[i].title + ">" + tracks[i].title + "<br>");
      }
    });
    $('#enter').append("<select><option value='sad'>Sad</option><option value='happy'>Happy</option><option value='angry'>Angry</option><option value='F DA POLICE'>F DA POLICE</option></select>");
    $('#enter').append("<button id = 'yeehaw'>Enter</button>")
  })

  $('#yeehaw').click(function(event){

  })

})
