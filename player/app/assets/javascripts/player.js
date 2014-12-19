$(document).ready(function(){

  n = new MusicPlayer()

  SC.initialize ({
    client_id: '5b91135eafaf701ea414c5fe6b86fdf3'
  });

  // SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
  //   var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
  //   n.updateSongID(ID);
  //   n.updateUrl();
  // });
  // n.play('#play');
  // n.stop('#pause')
})

$('#play').click(function(event) {
  n.play();
})

MusicPlayer = function() {
  this.songID = null;
  this.url = '';
}

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

