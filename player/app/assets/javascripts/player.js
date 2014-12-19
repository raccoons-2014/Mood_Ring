$(document).ready(function(){

  SC.get('/tracks', { tags: "rap" }, function(tracks) {
    var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
    current_track = 'https://api.soundcloud.com/tracks/' + ID + '/stream'

  });


  $('#play').click(function(event) {
  SC.stream(current_track, function(sound){
    sound.play();
  });
  })

})
