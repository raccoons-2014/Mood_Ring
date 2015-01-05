$(document).ready(function(){
    viz = new AudioController()
    init();
    animate();

  $('#stop-animation').click(function() {
  event.preventDefault();
  if ( sparksEmitter.isRunning() ) {
    sparksEmitter.stop();
    $('#stop-animation').hide();
    $('#start-animation').show()
  }

});

  $('#start-animation').click(function() {
  event.preventDefault();
  if ( sparksEmitter.isRunning() == false) {
    sparksEmitter.start();
    $('#stop-animation').show();
    $('#start-animation').hide();
  }

});

  $('#choose-mood').click(function() {
    $('#mood-selection').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#enter-song').click(function() {
    $('#slide1').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#hide').click(function() {
    $('#slide1').hide();
    $('#slide3').hide();
    $('#choose-mood').show();
    $('#enter-song').show();
  });

  $('#finish').click(function() {
    $('#slide3').hide();
    $('#enter-song').show();
    $('#choose-mood').show();
  });

  $('button.emotion').click(function(){
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
  var ajax = $('#ajax')[0]
  $('#connect').on('click', function(){
    connectToSoundcloud();
  });

  $('#go').click(function(event){
    var $titleSearch = $('#titleSearch').val();
    $('#slide1').hide();
    $('#slide2').show();
    $('#songList').show();
    $('#song-submit').show();
    $('#submit').show();
    SC.get('/tracks', {q: $titleSearch}, function(tracks) {
      for (var i = 0; i < 9; i++) {
        if (tracks[i].stream_url != 'undefined'){
          $('#songList').append("<li><a href='#' class='song' id =" + tracks[i].stream_url + ">" + tracks[i].title +  "</a></li>");
        }else{
          i = i - 1;
        }
      }
    });
  })

  $('#like').on('click', function(){
    PlayerWidget.favoriteTrack();
  });

  $('#songList').on( "click", ".song", function(event){
    event.preventDefault();
    stream_url = $(this).attr('id')
    title = $(this).text();
    $('#slide2').hide();
    $('#slide3').show();
  });

  $('.ajax').on("click", function(event){
    event.preventDefault();
    var mood = $(this).text();

  $.ajax ({
    url: 'songs/create',
    data: {title: title, stream_url: stream_url, mood: mood},
    type: "POST"
  }).done(function() {
    $('#songList').empty();
    // $('#submit').empty();
    $('#slide3').hide();
    $('#choose-mood').show();
    $('#enter-song').show();
    })
  });

  $('#like').on('click', function(){
    tagPlaylist.favoriteTrack();
  });

  $('.emotion').on("click", function() {
    $.ajax ({
      url: 'songs/index',
      type: "GET",
      dataType: "json",
      data: {mood: $(this)[0].id}
    }).done(function(response){
      console.log(response);
    })
  })
  
  $('#like').on('click', function(){
    tagPlaylist.favoriteTrack();
  });
})

