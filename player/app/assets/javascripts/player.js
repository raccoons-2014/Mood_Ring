$(document).ready(function(){
  getTracks();
})

var getTracks= function() {
 SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
    var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
    current_track = 'https://api.soundcloud.com/tracks/' + ID + '/stream'
    streamSongs();
  });
}

var streamSongs =  function(){
  SC.stream(current_track, function(sound){
    $('#play').click(function(event) {
      sound.play();
    }),
    $('#pause').click(function(event){
      sound.pause();
    });
  });
}
