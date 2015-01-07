$(document).ready(function(){
  var $addSong = $('#addSong');
  var $songMood = $('#songMood');
  var $chooseMood = $('#chooseMood');
  var $moodSelection = $('#moodSelection');
  $('#inputSong').hide();
  $('#addSong').hide();
  $('#songMood').hide();

  bringUpCreateSlideTwo = function() {
    Slides.show('addSong');
  }

  bringUpCreateSlideThree = function() {
    Slides.show('songMood');
  }

  bringUpSearchButton = function() {
    $('#enterSong').show();
  }

  $('#chooseMood').click(function() {
    Slides.show('big-ring');
    bringUpSearchButton();
  });

  $('#enterSong').click(function() {
    Slides.show('inputSong');
  });

  // $('button .emotion').click(function(){
  //   Slides.show('chooseMood');
  //   $('#enterSong').show();
  // });

  player = new AudioController([]);

  colorWheel = new ParticleRing();
  init();
  animate();
});

