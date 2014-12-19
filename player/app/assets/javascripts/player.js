$(document).ready(function(){

  n = new MusicPlayer()
    // find all sounds of buskers licensed under 'creative commons share alike'
  songID = SC.get('/tracks', { bpm:{from: 120} }, function(tracks) {
    console.log(tracks[Math.floor(Math.random()*tracks.length)].id);
    return tracks[Math.floor(Math.random()*tracks.length)].id;
  });

  SC.stream("/tracks/" + songID, function(sound){
    sound.play();
  MusicPlayer.prototype.fetchSong = function() {
    SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
      var url = tracks[Math.floor(Math.random()*tracks.length)].stream_url;
      n.updateStreamUrl(url);
    });
  }
}

  $('#play').click(function(event) {
    SC.stream(current_track, function(sound){
      sound.play();
    });
  })

})

