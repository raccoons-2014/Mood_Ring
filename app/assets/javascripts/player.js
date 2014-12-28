function PlayerWidget(tracklist) {
  this.tracklist = tracklist;
  this.current_track_title = ""
  this.current_track = ""
  this.trackUrls = [];
  this.trackTitles = [];
  this.populateTrackInfo(this.tracklist);
}

//get song array
PlayerWidget.prototype.populateTrackInfo= function(tracklist) {
  for (i = 0; i < tracklist.length; i++) {
    SC.get('/tracks', { q: tracklist[i] }, function(tracks) {
      this.trackUrls.push(tracks[0].title)
      this.trackTitles.push(tracks[0].stream_url)
  }
  this.current_track_title = this.trackTitles.shift();
  this.current_track = this.trackUrls.shift();
  $("#playlist").html(" <h1> Now playing: <br> " + this.current_track_title + " </h1>");
  }.bind(this));
};

PlayerWidget.prototype.resetCurrentTrack = function() {
//move throughout array
  this.trackTitles.shift();
  this.current_track_title = this.trackTitles[0];
  this.trackUrls.shift();
  this.current_track = this.trackUrls[0];
};

PlayerWidget.prototype.streamSong = function() {
  console.log("In streamSong, current track is " + this.current_track)
  console.log(this)

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

