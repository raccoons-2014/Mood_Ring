$(document).ready(function(){
  var $addSong = $('#addSong');
  var $songMood = $('#songMood');
  var $chooseMood = $('#chooseMood');
  var $moodSelection = $('#moodSelection');


  $("body").on("click", '#chooseMood', function() {
    Slides.show('mood-popup');
  });

  $('button.emotion').click(function(){
    Slides.show('chooseMood');
  });

  player = new AudioController([]);

  colorWheel = new ParticleRing();
  init();
  animate();
});

