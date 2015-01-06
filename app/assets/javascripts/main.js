function audioPlay(trackPlaylist) {
    viz = new AudioController(trackPlaylist);
    init();
    animate();
}

$(document).ready(function(){
  var $stopAnimation = $('#stop-animation');
  var $startAnimation = $('#start-animation');
  var $inputSong = $('#inputSong');
  var $addSong = $('#addSong');
  var $songMood = $('#songMood');
  var $chooseMood = $('#chooseMood');
  var $moodSelection = $('#moodSelection');
  var $enterSong = $('#enterSong');

  sourceCreated = false;

  $stopAnimation.click(function() {
    event.preventDefault();
    if ( sparksEmitter.isRunning() ) {
      sparksEmitter.stop();
      $stopAnimation.hide();
      $startAnimation.show()
    }

  });

  $startAnimation.click(function() {
    event.preventDefault();
    if ( sparksEmitter.isRunning() == false) {
      sparksEmitter.start();
      $stopAnimation.show();
      $startAnimation.hide();
    }
  });

  $chooseMood.click(function() {
    $moodSelection.show();
    $chooseMood.hide();
    $enterSong.hide();
  });

  $enterSong.click(function() {
    $inputSong.show();
    $chooseMood.hide();
    $enterSong.hide();
  });

  $('#hide').click(function() {
    $inputSong.hide();
    $songMood.hide();
    $chooseMood.show();
    $enterSong.show();
  });

  $('button.emotion').click(function(){
    $moodSelection.hide();
    $chooseMood.show();
    $enterSong.show();
  });

  $('#connect').on('click', function(){
    connectToSoundcloud();
  });

  $('#titleSearch').keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      var $titleSearch = $('#titleSearch').val();
      $inputSong.hide();
      $addSong.show();
      $('#songList').show();

      SC.get('/tracks', {q: $titleSearch}, function(tracks) {
        var tenTracks = Array.prototype.slice.call(tracks, 0, 9);
        tenTracks.forEach(function(track) {
          if (typeof(track.stream_url) == "undefined") return;
          $('#songList')
            .append("<li><a href='#' class='song' id =" + track.stream_url + ">" + track.title +  "</a><a href='#' class='preview' id='" + track.stream_url + "'>preview</a></li>");
        });
      });
    }
  });

  $('#songList').on("click", ".preview", function(event){
    event.preventDefault();
    var streamUrl = $(this).attr('id');
    debugger
    SC.get('/tracks', {stream_url: streamUrl}, function(tracks) {
      console.log(tracks);
    })
  })

  $('#songList').on( "click", ".song", function(event){
    event.preventDefault();
    stream_url = $(this).attr('id')
    title = $(this).text();
    $addSong.hide();
    $songMood.show();
  });

  $('.moodChoice').on("click", function(event){
    event.preventDefault();
    var mood = $(this)[0].id;

    $.ajax ({
      url: 'songs/create',
      data: {title: title, stream_url: stream_url, mood: mood},
      type: "POST"
    }).done(function() {
        $('#songList').empty();
        $songMood.hide();
        $chooseMood.show();
        $enterSong.show();

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

  $('.emotion').on("click", function() {

    $.ajax ({
      url: 'songs/index',
      type: "GET",
      dataType: "json",
      data: {mood: $(this)[0].id}
    }).done(function(response){
      if (sourceCreated === true) {
        viz.getNewTracks(response);
      } else {
        response = _.shuffle(response);
        audioPlay(response);
        sourceCreated = true;
      }
    })

  })

})

