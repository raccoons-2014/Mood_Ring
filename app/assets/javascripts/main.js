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
    $('#slide3').hide();
    $('#songList').empty();
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
      console.log(response);
    })

  })

})

