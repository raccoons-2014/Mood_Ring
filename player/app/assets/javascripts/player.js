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

function PlayerWidget = {
  this.current_track="";
  this.tracks_array= [];
}
PlayerWidget.prototype.getParameters= function {

}

PlayerWidget.prototype.fetchSongArray= function{
//get song array
}

PlayerWidget.prototype.setCurrentTrack = function {
//move throughout array
}

PlayerWidget.prototype.streamSong = function{
  //general play functions ... add next button
  SC.stream(current_track, function(sound){
  $('#play').click(function(event) {
    sound.play();
  }),
  $('#pause').click(function(event){
    sound.pause();
  });
});
}

PlayerWidget.prototype.nextSongFetch = function {
//get next song once first one finishes
}
