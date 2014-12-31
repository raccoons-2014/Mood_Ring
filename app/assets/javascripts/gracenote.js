jQuery.ajaxSettings.traditional = true;
var apiKey = 'Y8IIRKVUCI9ZLESEU';

function fillTracklist(tracks) {
  tagPlaylist = new PlayerWidget(tracks);
};

function getUserId() {
  var url = 'http://c5712896.web.cddbp.net/webapi/json/1.0/register';
  var args = {
    'client' : '5712896'
  };
  // $.getJSON(url, args,
  //     function(data) {
  //     })
  //     .success(function(data){
  //       return data
  //     })
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    data: args
  }).done(function(r){
    console.log(r)
  })
   }

function getGracenoteTracks() {
  var url = 'http://c5712896.web.cddbp.net/webapi/json/1.0/radio/fieldvalues';
  var args = {
    'fieldname' : 'RADIOMOOD',
    'client' : '5712896',
    'user' : getUserId()
  };
  console.log(args)
  $.getJSON(url, args,
    function(data) {
      console.log(data)
    })
    .success(function(data){
      console.log(data)
      // var tracks = data.response.songs;
      // tracknames = [];
      // for (var i = 0; i < tracks.length; i++) {
      //   tracknames.push( tracks[i].artist_name + " " + tracks[i].title );
      // };
      // fillTracklist(tracknames)
    })
 }


