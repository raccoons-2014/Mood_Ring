function PlayerWidget(sourceSelector, genre) {
  this.sourceSelector = sourceSelector;
  this.genre = genre_choice;
  this.trackUrls = [];
  this.trackTitles = [];
  this.populateTrackInfo(this.sourceSelector, this.genre);
}

// find params through input field
PlayerWidget.prototype.getTagName= function() {
  return this.sourceSelector.value;
}

//get song array
PlayerWidget.prototype.populateTrackInfo= function(sourceSelector, genre) {
  SC.get('/tracks', { q: sourceSelector.toLowerCase(), genres: genre }, function(tracks) {
    for (i = 0; i < tracks.length; i++) {
      var random_track = Math.floor(Math.random() * (tracks.length - 1));
      this.trackTitles.push(tracks[random_track].title);
      this.trackUrls.push(tracks[random_track].stream_url);
    };

    this.current_track_title = this.trackTitles[0];
    this.current_track = this.trackUrls[0];
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

