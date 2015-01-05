$(document).ready(function(){

  $('button.genre').click(function(e){
    genre_choice = this.id
    $('#genre-page').hide();
    $('#mood-page').show();
  });

  $('button.emotion').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    getEchoNestTracks(this.id)
    setTimeout(function(){tagPlaylist.setCurrentTrack();},1000);
    setTimeout(function(){tagPlaylist.streamSong()},1000);
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
    $('#songList').empty();
    $('#moodDropdown').empty();
    SC.get('/tracks', {q: $('#text').val()}, function(tracks) {
      for (i = 0; i < tracks.length; i++) {
        $('#songList').append("<label><input type='radio' name='song' value =" + tracks[i].stream_url + ">" + tracks[i].title + "</label><br>");
      }
    });
    $('#moodDropdown').append("<select id = 'dropDownList'><option value='sad'>Sad</option><option value='happy'>Happy</option><option value='angry'>Angry</option><option value='F DA POLICE'>F DA POLICE</option></select>");
  })

  $('#ajax').on("click", function(event){
    event.preventDefault();
    var stream_url = $("#songList input[name='song']:checked")[0].value;
    var title = $("#songList input[name='song']:checked").parent().text();
    var mood = $('#moodDropdown option:selected').text();
    console.log(stream_url);
    console.log(title);
    console.log(mood);

    $.ajax ({
      url: 'songs/create',
      data: {title: title, stream_url: stream_url, mood: mood},
      dataType: "json",
      type: "POST"
    }).done(function() {
      $('#songList').empty();
      $('#moodDropdown').empty();
      $('#submit').empty();
      console.log("done");
    })
  });

})
