$(document).ready(function(){
    viz = new Visualizer('https://api.soundcloud.com/tracks/184210017/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6')
    init();
    animate();

  $('#options').click(function(e) {
    $('#slide1').show();
    $('#options').hide();
  });

  $('#hide').click(function(e) {
    $('#slide1').hide();
    $('#slide3').hide();
    $('#options').show();
  });

  $('#finish').click(function(e) {
    $('#slide3').hide();
    $('#options').show();
  });
  $('#next-slide').click(function(e) {
    $('#slide1').hide();
    $('#slide2').show();
  })

  $('button.emotion').click(function(e){
    $('#slide2').hide();
    $('#slide3').show();
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

  $('#like').on('click', function(){
    PlayerWidget.favoriteTrack();
  });

})
