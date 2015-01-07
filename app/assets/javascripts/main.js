$(document).ready(function(){
  var $addSong = $('#addSong');
  var $songMood = $('#songMood');
  var $chooseMood = $('#chooseMood');
  var $moodSelection = $('#moodSelection');


  $("body").on("click", '#chooseMood', function() {
    $('#mood-popup').show();
    $chooseMood.hide();
  });

  $('button.emotion').click(function(){
    Slides.show('chooseMood');

  });

  var player = new AudioController([]);

  var vizualizer = new ParticleRing(player.song);
  console.log(vizualizer)
})

