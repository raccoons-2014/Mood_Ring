function audioPlay(trackPlaylist) {
    viz = new AudioController(trackPlaylist);
    init();
    animate();
}

function getDisplay(url) {

   $.ajax ({
    url: url,
    type: "GET"
  }).done(function(response) {
   $("body").html(response)
    })

  }

$(document).ready(function(){


  sourceCreated = false;

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

  $('button.emotion').click(function(){
    $('#mood-selection').hide();
    $('#choose-mood').show();
    $('#enter-song').show();
  });

  $('#connect').on('click', function(){
    connectToSoundcloud();
  });

  $('#titleSearch').keydown(function(e) {
    SC.initialize({
    client_id: "5b91135eafaf701ea414c5fe6b86fdf3",
    });
    if (e.keyCode == 13) {
      e.preventDefault();
      var $titleSearch = $('#titleSearch').val();
       $('#slide1').hide();
      $('#slide2').show();
      $('#songList').show();

      SC.get('/tracks', { q: $titleSearch }, function(tracks) {

        var tenTracks = Array.prototype.slice.call(tracks, 0, 9);
        tenTracks.forEach(function(track) {
          if (typeof(track.stream_url) == "undefined") return;
          $('#songList')
            .append("<li><a href='#' class='song' id =" + track.stream_url + ">" + track.title +  "</a></li>");
        });
      });
    }
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
    var mood = $(this)[0].id;

    $.ajax ({
      url: 'songs/create',
      data: {title: title, stream_url: stream_url, mood: mood},
      type: "POST"
    }).done(function() {
        $('#songList').empty();
        $('#slide3').hide();
        $('#choose-mood').show();
        $('#enter-song').show();

        $.ajax ({
          url: 'songs/index',
          type: "GET",
          dataType: "json",
          data: {mood: mood}
        }).done(function(response){
          if (sourceCreated === true) {
            response = _.shuffle(response);
            response.unshift({stream_url: stream_url, title: title})
            viz.getNewTracks(response)
          } else {
            response = _.shuffle(response);
            response.unshift({stream_url: stream_url, title: title})
            audioPlay(response);
            sourceCreated = true;
          }
        })

      })
  });

  $('body').on("click", ".glowing-ring", function() {
    var clickedMood = $(this).data( "mood" );
    getDisplay('welcome/player');
    $.ajax ({
      url: 'songs/index',
      type: "GET",
      dataType: "json",
      data: {mood: clickedMood }
    }).done(function(response){
      audioPlay(response);
      if (sourceCreated === true) {
        viz.getNewTracks(response);
      } else {
        response = _.shuffle(response);
        sourceCreated = true;
      }
    })
  })
})

