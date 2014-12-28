$(document).ready(function(){
  genre_choice = ""
  tracknames = [];


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

  $('#connect').on('click', function(){
    connectToSoundcloud();
  });
})

