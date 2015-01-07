var MoodDb = MoodDb || {};


// song {stream_url, title, mood}
MoodDb.addSong = function(song) {

};

MoodDb.getSong = function(mood) {
  return Promise.resolve($.ajax({
    url: 'songs/index',
    type: "GET",
    dataType: "json",
    data: {mood: mood}
  }));
};
//getSongs

//addSongs 