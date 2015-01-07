$(document).ready(function(){
  var $addSong = $('#addSong');
  var $songMood = $('#songMood');
  var $chooseMood = $('#chooseMood');
  var $moodSelection = $('#moodSelection');


  $("body").on("click", '#chooseMood', function() {
    Slides.show('mood-ring');
  });

  $('button.emotion').click(function(){
    Slides.show('base');
  });

  var player = new AudioController([]);
  var vizualizer = new ParticleRing(player.song);
})

