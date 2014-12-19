$(document).ready(function(){

  SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
    var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
    current_track = 'https://api.soundcloud.com/tracks/' + ID + '/stream'

  });


  $('#play').click(function(event) {
  SC.stream(current_track, function(sound){
    sound.play();
  });
  })

})


  // n.play('#play');
  // n.stop('#pause')
// $('#play').click(function(event) {
//   n.play();
// })

// MusicPlayer = function() {
//   this.songID = null;
//   this.url = '';
// }

// //To refactor
// MusicPlayer.prototype.play = function(){
//   SC.stream('https://api.soundcloud.com/tracks/182163764/stream', function(sound){
//     sound.play();
//   });
// }

// MusicPlayer.prototype.stop = function(button){
//   $(button).on('click', function(){
//     soundManager.pauseAll();
//   })
// }

// MusicPlayer.prototype.updateSongID = function(ID) {
//   this.songID = ID;
// }

// MusicPlayer.prototype.updateUrl = function() {
//   this.url = 'https://api.soundcloud.com/tracks/' + this.songID + '/stream';
// }
