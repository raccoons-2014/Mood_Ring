$(document).ready(function(){
  n = new MusicPlayer('https://api.soundcloud.com/tracks/182163764/stream')
  n.play('#play');
  n.stop('#pause');
})

MusicPlayer = function(music) {
  this.music = music;
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
  });
}

MusicPlayer.prototype.stop = function(button){
  $(button).on('click', function(){
    soundManager.pauseAll();
  })
}


