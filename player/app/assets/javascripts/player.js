//   $(document).ready(function() {

//   SC.stream("/tracks/293", function(sound){
//     sound.play();
//   });

// })


$(document).ready(function(){
  n = new MusicPlayer('/tracks/293')
  n.play('#play');
  n.stop('#stop');
})

MusicPlayer = function(music) {
  this.music = music;
}

MusicPlayer.prototype.play = function(button){
  SC.stream(this.music, function(sound){
    $(button).on('click', function(){
      sound.play();
    });
  });
}

MusicPlayer.prototype.stop = function(button){
    $(button).on('click', function(){
      console.log("hello");
      soundManager.stopAll();
    })
}
