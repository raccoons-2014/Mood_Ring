jQuery.ajaxSettings.traditional = true; 
var apiKey = 'Y8IIRKVUCI9ZLESEU';
tracknames = [];
 
function populateTrackList(tracks){
  for (i = 0; i < tracks.length; i++) { 
    tracknames.push( tracks[i].artist_name + " " + tracks[i].title );
  }
};

function playSong(song) {
  tagPlaylist = new PlayerWidget(song);
  setTimeout(function(){tagPlaylist.streamSong()},100);
    $("#test").text(song);
  };
  

function getEchoNestTracks(mood) {
    var url = 'http://developer.echonest.com/api/v4/playlist/static';
    var args = {
      'api_key' : apiKey,
      'song_type': "studio",
      'song_min_hotttnesss': "0.25",
      'artist_min_hotttnesss': "0.25",
      'style': genre_choice,
      'format': 'json',
      'description': mood,
      'type':'artist-description'
    };
    $.getJSON(url, args,
      function(data) {
        if (data.response.status.code == 0) {
          populateTrackList(data.response.songs)
            } else {
              error("Trouble creating playlist");
            }
        },
      function() {
        console.log('error');
        error("Trouble creating playlist");
      }
    );
 }


