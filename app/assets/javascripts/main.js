$(document).ready(function(){
    viz = new Visualizer('https://api.soundcloud.com/tracks/184210017/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6')
    init();
    animate();

  $('#choose-mood').click(function(e) {
    $('#mood-selection').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#enter-song').click(function(e) {
    $('#slide1').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#hide').click(function(e) {
    $('#slide1').hide();
    $('#slide3').hide();
    $('#enter-song').show();
  });

  $('#finish').click(function(e) {
    $('#slide3').hide();
    $('#enter-song').show();
    $('#choose-mood').show();
  });

  $('#next-slide').click(function(e) {
    $('#slide2').hide();
    $('#slide3').show();
  });

  $('#submit').click(function(e) {
    $('#slide1').hide();
    $('#slide2').show();
  })

  $('button.emotion').click(function(e){
    $('#mood-selection').hide();
    $('#choose-mood').show();
    $('#enter-song').show();
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
<<<<<<< HEAD
=======

  $('#fav').on('click', function(){
    debugger
    tagPlaylist.favoriteTrack();
  });

>>>>>>> adding favorite button - wip
})
