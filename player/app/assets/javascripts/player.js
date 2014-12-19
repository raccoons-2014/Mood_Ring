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

//To refactor
MusicPlayer.prototype.fetchSong = function() {
  SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
    var url = tracks[Math.floor(Math.random()*tracks.length)].stream_url;
    n.updateStreamUrl(url);
  });
}

MusicPlayer.prototype.play = function(button){
  SC.stream(this.stream_url, function(sound){
    $(button).on('click', function(){
      sound.play();
    });
  });
}

MusicPlayer.prototype.stop = function(button){
  $(button).on('click', function(){
    soundManager.pauseAll();
  })
}

MusicPlayer.prototype.updateStreamUrl = function(url) {
  this.streamUrl = url;
}
