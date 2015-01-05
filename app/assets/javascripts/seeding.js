
  $('#go').click(function(event){
    $('#songList').empty();
    $('#moodDropdown').empty();
    $('#submit').empty();
    SC.get('/tracks', {q: $('#text').val()}, function(tracks) {
      for (i = 0; i < tracks.length; i++) {
        $('#songList').append("<input type='radio' name='song' id=" + tracks[i].title +  " value =" + tracks[i].stream_url + ">" + tracks[i].title + "<br>");
      }
    });
    $('#moodDropdown').append("<select id='dropDownList'><option value='sad'>Sad</option><option value='happy'>Happy</option><option value='angry'>Angry</option><option value='F DA POLICE'>F DA POLICE</option></select>");
  })
