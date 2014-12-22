$(document).ready(function(){
  $('#happy').click(function(e){
    e.preventDefault();
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#sad').click(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);

  });

  $('#angry').click(function(e){
      if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(this.id);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#genre_form').submit(function(e){
    if (typeof(soundManager) != "undefined") {
      soundManager.stopAll();
    };
    e.preventDefault();
    tagPlaylist = new PlayerWidget(landing_genre.value);
    setTimeout(function(){tagPlaylist.streamSong()},100);
  });

  $('#connect').on('click', function(){
  alert("Hello maggie")
});
})
function PlayerWidget(sourceSelector) {
  this.sourceSelector = sourceSelector;
  this.trackUrls = [];
  this.trackTitles = [];
  this.populateTrackInfo(this.sourceSelector);

}

function connectToSoundcloud(){
  SC.initialize({
    client_id: '"5b91135eafaf701ea414c5fe6b86fdf3"'
  });

  SC.connect(function() {
    SC.get('/me', function(me) { 
      alert('Hello, ' + me.username); 
    });
  });
}
// find params through input field
PlayerWidget.prototype.getTagName= function() {
  return this.sourceSelector.value;
}

//get song array
PlayerWidget.prototype.populateTrackInfo= function(params) {
  SC.get('/tracks', { tags: params.toLowerCase() }, function(tracks) {
    console.log(params)

    for (i=0; i <tracks.length; i++) {
      this.trackTitles.push(tracks[i].title);
      this.trackUrls.push(tracks[i].stream_url);
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

