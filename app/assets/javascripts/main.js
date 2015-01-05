$(document).ready(function(){
    viz = new AudioController()
    init();
    animate();

  $('#choose-mood').click(function() {
    $('#mood-selection').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#enter-song').click(function() {
    $('#slide1').slideDown("slow");
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
    var artist = "none"

    $.ajax ({
      url: 'songs/create',
      data: {title: title, stream_url: stream_url, mood: mood},
      dataType: "json",
      type: "POST"
    }).done(function() {
      $('#songList').empty();
      $('#moodDropdown').empty();
      $('#submit').empty();
      $('#slide3').hide();
    })
  });

})

