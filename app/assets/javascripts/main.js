$(document).ready(function(){
    viz = new Visualizer('https://api.soundcloud.com/tracks/184210017/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6')
    init();
    animate();

  $('#choose-mood').click(function(e) {
    $('#mood-selection').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#enter-song').click(function(e) {
    $('#slide1').show();
    $('#choose-mood').hide();
    $('#enter-song').hide();
  });

  $('#hide').click(function(e) {
    $('#slide1').hide();
    $('#slide3').hide();
    $('#enter-song').show();
  });

  $('#finish').click(function(e) {
    $('#slide3').hide();
    $('#enter-song').show();
    $('#choose-mood').show();
  });

  $('#next-slide').click(function(e) {
    $('#slide2').hide();
    $('#slide3').show();
  });

  $('#submit').click(function(e) {
    $('#slide1').hide();
    $('#slide2').show();
  })

  $('button.emotion').click(function(e){
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

    $('#ajax').empty();
    // $('#songList').empty();
    // $('#moodDropdown').empty();
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

