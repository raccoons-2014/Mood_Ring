function audioPlay(trackPlaylist) {
    viz = new AudioController(trackPlaylist)
    init();
    animate();
}


$(document).ready(function(){


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

  $('#song-submit').click(function() {
    $('#slide2').hide();
    $('#slide3').show();

  });

  $('button.emotion').click(function(){
    $('#mood-selection').hide();
    $('#choose-mood').show();
    $('#enter-song').show();
  });

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
    $('#moodDropdown').show();
    SC.get('/tracks', {q: $titleSearch}, function(tracks) {
      for (i = 0; i < 9; i++) {
        $('#songList').append("<li><label><input type='radio' name='song' value =" + tracks[i].stream_url + ">" + tracks[i].title + "</label></li>");
      }
    });
  })

  $('.ajax').on("click", function(event){
    event.preventDefault();
    var stream_url = $("#songList input[name='song']:checked")[0].value;
    var title = $("#songList input[name='song']:checked").parent().text();
    var mood = $(this).text();


    $.ajax ({
      url: 'songs/create',
      data: {title: title, stream_url: stream_url, mood: mood},
      type: "POST"
    }).done(function() {
      $('#slide3').hide();
      $('#songList').empty();
      $('#moodDropdown').empty();
      $('#submit').empty();
      $('#slide3').hide();
    })
  });

  $('.emotion').on("click", function() {
    $.ajax ({
      url: 'songs/index',
      type: "GET",
      dataType: "json",
      data: {mood: $(this)[0].id}
    }).done(function(response){
      audioPlay(response);
    })

  })

})

