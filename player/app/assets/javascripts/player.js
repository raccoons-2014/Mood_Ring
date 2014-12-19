$(document).ready(function(){
  SC.initialize ({
    client_id: '5b91135eafaf701ea414c5fe6b86fdf3'
  });

  n = new MusicPlayer()
  n.fetchSong();

  n.play('#play');
  n.stop('#pause');
})

MusicPlayer = function() {
  this.stream_url = "";
}

  SC.initialize({
    client_id: '5b91135eafaf701ea414c5fe6b86fdf3'
  });
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

MusicPlayer.prototype.stop = function(button){
  $(button).on('click', function(){
    soundManager.pauseAll();
  })
}


MusicPlayer.prototype.updateStreamUrl = function(url) {
  this.streamUrl = url;
}

