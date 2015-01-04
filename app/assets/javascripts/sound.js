function Visualizer(current_song_url) {
this.current_song_url= current_song_url;
var canvas = document.querySelector('.visualizer');
this.canvasCtx=canvas.getContext("2d");
}




function soundMain () {
var context = new webkitAudioContext(),
    audio = new Audio(),
    source,
    // `stream_url` you'd get from
    // requesting http://api.soundcloud.com/tracks/6981096.json
    url = 'https://api.soundcloud.com/tracks/184210017/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6';

audio.src = url;
source = context.createMediaElementSource(audio);
source.connect(context.destination);
//
// source.mediaElement.play();

var analyser = context.createAnalyser();
source.connect(analyser);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteFrequencyData(dataArray);

var canvas = document.querySelector('.visualizer');
 canvasCtx = canvas.getContext("2d");


WIDTH = canvas.width= window.innerWidth;
HEIGHT = canvas.height = window.innerHeight;



 canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

 function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);
  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 4;
  canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

  var centerWidth= WIDTH/2;
  var centerHeight = HEIGHT/2;
  var radius = 100;


  // find sum
  var total = 0;
  for(var i = 0; i < bufferLength; i++) {
    total += dataArray[i];
  };
  //find average
  total=total/bufferLength;

  canvasCtx.beginPath();

  canvasCtx.arc(centerWidth,centerHeight,total,0,2*Math.PI);
  canvasCtx.stroke();


};

draw();

};
