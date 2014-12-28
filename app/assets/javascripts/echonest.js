jQuery.ajaxSettings.traditional = true;
var apiKey = 'Y8IIRKVUCI9ZLESEU';


// function populateTrackList(tracks){
//   for (var i = 0; i < tracks.length; i++) {
//     tracknames.push( tracks[i].artist_name + " " + tracks[i].title );
//   }
// };

function fillTracklist(tracks) {
  tagPlaylist = new PlayerWidget(tracks);
};

function getEchoNestTracks(mood) {
  var url = 'http://developer.echonest.com/api/v4/playlist/static';
  var args = {
    'api_key' : apiKey,
    'song_type': "studio",
    'song_min_hotttnesss': "0.5",
    'artist_min_hotttnesss': "0.5",
    'style': genre_choice,
    'format': 'json',
    'description': mood,
    'type':'artist-description'
  };
  $.getJSON(url, args,
    function(data) {
    })
    .success(function(data){
      var tracks = data.response.songs;
      tracknames = [];
      for (var i = 0; i < tracks.length; i++) {
        console.log(tracks[i].artist_name)
        tracknames.push( tracks[i].artist_name + " " + tracks[i].title );
      };
      console.log(tracknames)
      fillTracklist(tracknames)
    })
 }


