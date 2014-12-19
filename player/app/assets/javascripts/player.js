$(document).ready(function(){

 //on submit get paramter, then fetchsongArrary, them stream songs, then play next, repeat
})

var getTracks= function() {
 SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
    var ID = tracks[Math.floor(Math.random()*tracks.length)].id;
    current_track = 'https://api.soundcloud.com/tracks/' + ID + '/stream'
    streamSongs();
  });
}

function PlayerWidget(sourceSelector) {
  this.sourceSelector = sourceSelector;
  this.trackUrls = [];
  this.populateTrackUrls(this.getTagName());
}

// find params through input field
PlayerWidget.prototype.getTagName= function() {
  return this.sourceSelector.value;
}

//get song array
PlayerWidget.prototype.populateTrackUrls= function(params) {
  SC.get('/tracks', { tags: params.toLowerCase() }, function(tracks) {
    console.log(params)
    for (i=0; i <tracks.length; i++) {
      this.trackUrls.push(tracks[i].stream_url);
    };
    this.current_track = this.trackUrls[0];
  }.bind(this));
}

PlayerWidget.prototype.setCurrentTrack = function() {
//move throughout array
}

PlayerWidget.prototype.streamSong = function() {
  //general play functions ... add next button
  SC.stream(this.current_track, function(sound){
  $('#play').click(function(event) {
    sound.play();
  }),
  $('#pause').click(function(event){
    sound.pause();
  });
});
}

PlayerWidget.prototype.nextSongFetch = function() {
//get next song once first one finishes
}

