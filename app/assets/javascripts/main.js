$(document).ready(function(){
  var $addSong = $('#addSong');
  var $songMood = $('#songMood');
  var $chooseMood = $('#chooseMood');
  var $moodSelection = $('#moodSelection');
  var $playlist = $('#playlist');
  var $enterSong = $('#enterSong');
  $('#inputSong').hide();
  $('#addSong').hide();
  $('#songMood').hide();
  $('#chooseMood').hide();
  $playlist.hide();
  $enterSong.hide();


  bringUpCreateSlideTwo = function() {
    Slides.show('addSong');
  }

  bringUpCreateSlideThree = function() {
    Slides.show('songMood');
  }

  bringUpSearchButton = function() {
    $enterSong.show();
  }
  bringUpChooseMood = function() {
    $('#chooseMood').show();
  }



  $('#chooseMood').click(function() {
    Slides.show('big-ring');
    bringUpSearchButton();
  });

  $enterSong.click(function() {
    Slides.show('inputSong');
  });

  player = new AudioController([]);

  colorWheel = new ParticleRing();
  init();
  animate();

  hoverToggling($enterSong);
  hoverToggling($playlist);

 $(document).mousemove(function() {
    $playlist.fadeIn('slow');
    $enterSong.fadeIn('slow');
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    };
    timer = setTimeout(function() {
      hoverListener($enterSong);
      hoverListener($playlist);
    }, 2000);
  })

});

