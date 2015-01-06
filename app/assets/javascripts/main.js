function audioPlay(trackPlaylist) {
    if (typeof(viz) == "undefined") {
      viz = new AudioController(trackPlaylist);
      init();
      animate();
    }


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

  $enterSong.click(function() {
    $inputSong.show();
    $chooseMood.hide();
    $enterSong.hide();
  });

   $("body").on("click", '#chooseMood', function(){
    console.log("this is rrrr")
    $('#mood-popup').show();
  })


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
    SC.initialize({
    client_id: "5b91135eafaf701ea414c5fe6b86fdf3",
    });
    if (e.keyCode == 13) {
      e.preventDefault();
      var $titleSearch = $('#titleSearch').val();
      $inputSong.hide();
      $addSong.show();
      $('#songList').show();

      SC.get('/tracks', { q: $titleSearch }, function(tracks) {

        var tenTracks = Array.prototype.slice.call(tracks, 0, 9);
        tenTracks.forEach(function(track) {
          if (typeof(track.stream_url) == "undefined") return;
          $('#songList')
            .append("<li><ul class ='fetchedSongs'><li><img src ='/assets/play-3-16.png' class='preview' id='" + track.stream_url + "'></li><li><img src ='/assets/stop-3-16.png' class='pauseReview'></li><li><a href='#' class='song' id =" + track.stream_url + ">" + track.title +  "</a></li></ul></li>");
        });
      });
    }
  });

  $('#songList').on("click", ".pauseReview", function(event){
    event.preventDefault();
    $("#pause").css("visibility", "hidden");
    $("#play").css("visibility", "visible");
    source.mediaElement.pause();
  })

  $('#songList').on("click", ".preview", function(event){
    event.preventDefault();
    $("#play").css("visibility", "hidden");
    $("#pause").css("visibility", "visible");
    $('#track-title').html("Preview");
    var streamUrl = this.id;
    var streamUrlPlay = this.id + "?client_id=c751293c35f7cb00b48ee6383ea84aa6";

     if (sourceCreated === true) {
        song.src = streamUrlPlay;
        source.mediaElement.play();
      } else {
        audioPlay([{stream_url: streamUrl}]);
        sourceCreated = true;
    }
  })

  $('#songList').on( "click", ".song", function(event){
    event.preventDefault();
    source.mediaElement.pause();
    stream_url = $(this).attr('id')
    title = $(this).text();
    $addSong.hide();
    $songMood.show();
  });

  $('.moodChoice').on("click", function(event){
    event.preventDefault();
    var mood = $(this)[0].id;
    getDisplay('welcome/player');
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

  $('body').on("click", ".glowing-ring", function(e) {
    e.preventDefault();
     $('#mood-popup').hide();
    var clickedMood = $(this).data( "mood" );
    if (sourceCreated === false) getDisplay('welcome/player');
    $.ajax ({
      url: 'songs/index',
      type: "GET",
      dataType: "json",
      data: {mood: clickedMood }
    }).done(function(response){
      if (sourceCreated === true) {
        viz.getNewTracks(response);
        audioPlay(response)
      } else {
        response = _.shuffle(response);
        audioPlay(response);
        sourceCreated = true;
      }
    })
  })
})

