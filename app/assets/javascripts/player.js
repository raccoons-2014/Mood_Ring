function PlayerWidget(track) {
  this.track = track;
  this.trackUrls = [];
  this.trackTitles = [];
  this.populateTrackInfo(this.track);
}


//get song array
PlayerWidget.prototype.populateTrackInfo= function(track) {
  SC.get('/tracks', { title: track }, function(tracks) {
    this.current_track_title = track[0].title;
    this.current_track = track[0].stream_url;
        $("#playlist").html(" <h1> Now playing: <br> " + this.current_track_title + " </h1>");
  }.bind(this));

}

PlayerWidget.prototype.resetCurrentTrack = function() {
//move throughout array
this.trackTitles.shift();
this.current_track_title = this.trackTitles[0];
this.trackUrls.shift();
this.current_track= this.trackUrls[0];
}

PlayerWidget.prototype.streamSong = function() {
  //general play functions ... add next button
  SC.stream(this.current_track, function(sound){
    sound.play();
  $('#play').click(function(event) {
    sound.resume({
      onfinish: function(){
        soundManager
        this.resetCurrentTrack();
        this.streamSong();//play that next song
      }
    });
  }),
  $('#pause').click(function(event){
    sound.pause();
  });
});
}

PlayerWidget.prototype.nextSongFetch = function() {
//get next song once first one finishes
//returns
  $('#next').click(function(event) {

  });
}


 //on submit get paramter, then fetchsongArrary, them stream songs, then play next, repeat

