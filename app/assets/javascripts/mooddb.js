// $('.welcome.show').ready(function(){
//   var MoodDb = MoodDb || {};


//   // song {stream_url, title, mood}
//   MoodDb.addSong = function(title, stream_url, mood) {
//     return Promise.resolve($.ajax ({
//       url: 'songs/create',
//       data: {title: title, stream_url: stream_url, mood: mood},
//       type: "POST"
//     }));
//   }

//   MoodDb.getSong = function(mood) {
//     return Promise.resolve($.ajax({
//       url: '../songs/index',
//       type: "GET",
//       dataType: "json",
//       data: {mood: mood}
//     }));
//   };
// });
