$(document).ready(function(){

  getTracks();

  // var someSound = soundManager.createSound({
  //   id: "sound",
  //   url: current_track
  // });



  // $('#pause').click(function(event){
  //   SC.stream(current_track, function(sound){
  //     sound.pause();
  //   });
  // })

})

var getTracks= function() {
 SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
    var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
    current_track = 'https://api.soundcloud.com/tracks/' + ID + '/stream'
    console.log(current_track);
    streamSongs();
  });
}

var streamSongs =  function(){
  console.log('I"m getting here first!')
  SC.stream(current_track, function(sound){
    $('#play').click(function(event) {
      sound.play();
    }),
    $('#pause').click(function(event){
      sound.pause();
      console.log("pause");
    });
  });
}
