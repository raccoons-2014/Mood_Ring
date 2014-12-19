$(document).ready(function(){

  n = new MusicPlayer()
  // n.play('#play');
  // n.stop('#pause');

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

//To refactor
MusicPlayer.prototype.play = function(){
  SC.stream('https://api.soundcloud.com/tracks/182163764/stream', function(sound){
    sound.play();
  });
}

MusicPlayer.prototype.stop = function(button){
  $(button).on('click', function(){
    soundManager.pauseAll();
  })
}

MusicPlayer.prototype.updateSongID = function(ID) {
  this.songID = ID;
}

MusicPlayer.prototype.updateUrl = function() {
  this.url = 'https://api.soundcloud.com/tracks/' + this.songID + '/stream';
}
