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
  hoverToggling($chooseMood);

 $(document).mousemove(function() {
    $('body').css({'cursor' : 'auto'});
    $playlist.fadeIn('slow');
    hoverCrossout($('#big-ring'), $chooseMood);
    hoverCrossout($(".inputSlides"), $enterSong);
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    };
    timer = setTimeout(function() {
      hoverListener($enterSong);
      hoverListener($playlist);
      hoverListener($chooseMood);
      $('body').css({'cursor' : 'none'});
    }, 2000);
  })

});

