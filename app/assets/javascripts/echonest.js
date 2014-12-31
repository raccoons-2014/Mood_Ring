jQuery.ajaxSettings.traditional = true;
var apiKey = 'Y8IIRKVUCI9ZLESEU';

function fillTracklist(tracks) {
  tagPlaylist = new PlayerWidget(tracks);
};

function getEchoNestTracks(mood) {
  var url = 'http://developer.echonest.com/api/v4/playlist/static';
  var args = {
    'api_key' : apiKey,
    'results' : 100,
    'song_type': "studio",
    'song_min_hotttnesss': "0.4",
    'artist_min_hotttnesss': "0.4",
    'style': mood + "^2",
    'format': 'json',
    'mood': mood + "^2",
    'description' : mood + "^2",
    'type':'artist-description'
  };
  $.getJSON(url, args,
    function(data) {
    })
    .success(function(data){
      var tracks = data.response.songs;
      tracknames = [];
      for (var i = 0; i < tracks.length; i++) {
        tracknames.push( tracks[i].artist_name + " " + tracks[i].title );
      };
      fillTracklist(tracknames)
    })
 }


