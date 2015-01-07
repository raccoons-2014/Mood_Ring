var SCsearch = SCsearch || {};

// TODO: Put SC.initialize here?

$(document).ready(function(){
  // TODO: ...or put SC.initialize here?

  var $inputSong = $('#inputSong');
  var $enterSong = $('#enterSong');

  // $enterSong.click(function() {
  //   Slides.show('search');
  // });

  $('#hide').click(function() {
    Slides.show('base');
  });

  $('#titleSearch').keydown(function(e) {
    SC.initialize({
      client_id: "5b91135eafaf701ea414c5fe6b86fdf3",
    });
    if (e.keyCode == 13) {
      e.preventDefault();
      var $titleSearch = $('#titleSearch').val();
      bringUpCreateSlideTwo();
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

});
