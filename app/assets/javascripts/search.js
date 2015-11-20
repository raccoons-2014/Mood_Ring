var SCsearch = SCsearch || {};

$(document).ready(function(){

  var $inputSong = $('#inputSong');
  var $enterSong = $('#enterSong');

  $('.hide').click(function() {
    $('.slide').hide();
    $("#pause").hide();
    $("#play").show();
    song.pause();
    $('#track-title').html("");
    bringUpChooseMood();
    bringUpSearchButton();
  });

  $('#toFirstSlide').click(function() {
    Slides.show('inputSong');
    song.pause();
    $('#track-title').html("");
  })

  $('#toSecondSlide').click(function() {
    Slides.show('addSong');
  })

  $('#titleSearch').keydown(function(e) {
    $('#songList').html("");
    SC.initialize({
      // client_id: "5b91135eafaf701ea414c5fe6b86fdf3",
        client_id: "e67d17cea5de0deead27fed93e338691",
    });
    if (e.keyCode == 13) {
            e.preventDefault();
      var $titleSearch = $('#titleSearch').val();


      SC.get('/tracks', { q: $titleSearch }, function(tracks) {
        if (tracks.length ===0) {
          $('#search-error').html("Can't find song. Try Another!");
          $('#titleSearch').val('');
        } else {
        var tenTracks = Array.prototype.slice.call(tracks, 0, 9);
        tenTracks.forEach(function(track) {
          if (typeof(track.stream_url) == "undefined") return;
          $('#songList')
            .append("<li><ul class ='fetchedSongs'><li><img src ='/assets/play-3-16.png' class='preview' id='" + track.stream_url + "'></li><li><img src ='/assets/stop-3-16.png' class='pauseReview'></li><li><img class='song' id =" + track.stream_url + " title = " + '"' +track.title +'"' + " src = '/assets/plus-5-16.png'> </li><li><a href='#' >" + track.title +  "</a></li></ul></li>");
        });
        bringUpCreateSlideTwo();
      $('#songList').show();
      };
    });

    }
  });

  $('#songList').on("click", ".pauseReview", function(event){
    event.preventDefault();
    var myPreview = $(this).parent().prev('li').children('.preview');
    $(this).toggle(false);
    myPreview.toggle(true);
    $("#pause").hide();
    $("#play").show();
    song.pause();
  })

  $('#songList').on("click", ".preview", function(event){
    event.preventDefault();
    var myPause = $(this).parent().next('li').children('.pauseReview');
    $('.pauseReview').toggle(false);
    $('.preview').toggle(true);
    $(this).toggle(false);
    myPause.toggle(true);
    $("#play").hide();
    $("#pause").show();
    $('#track-title').html("Preview");
    var streamUrl = this.id;
    var streamUrlPlay = this.id + "?client_id=e67d17cea5de0deead27fed93e338691";
    player.getNewTracks([{stream_url: streamUrl}]);
  })

  $('#songList').on( "click", ".song", function(event){
    event.preventDefault();
    song.pause();
    stream_url = $(this).attr('id')
    title = $(this).attr('title');
    Slides.show('songMood');
  });



});
