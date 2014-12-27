$.getJSON(ECHONEST_SIMILAR_URI, {
    api_key: ECHONEST_KEY,
    name: ['Radiohead', 'John Coltrane', 'Youth Lagoon', 'Liars', 'Bob Dylan']
}, function(response){
    var data = response.response;
    for (var i = 0, len = data['artists'].length; i < len; i++){
        var artist = data['artists'][i];
        console.log(artist['name']);
    }
} );
