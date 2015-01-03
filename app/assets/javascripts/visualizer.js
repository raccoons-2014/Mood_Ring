function Visualizer(song_url) {
this.context = new webkitAudioContext();
this.analyser = this.context.createAnalyser();
     this.analyser.fftSize = 2048;
this.setUpSource(song_url);
this.bufferLength = this.analyser.frequencyBinCount;
this.dataArray = new Uint8Array(this.bufferLength);
averageFrequency = 1;
}

 //connect everything
Visualizer.prototype.setUpSource = function (song_url) {
  audio = new Audio();
  audio.src = song_url;
  source = this.context.createMediaElementSource(audio);
  source.connect(this.context.destination);
  source.connect(this.analyser);

}

//return averageFrequency
Visualizer.prototype.getFrequencyData = function() {
  this.analyser.getByteFrequencyData(this.dataArray);

      for(var i = 0; i < this.bufferLength; i++) {
        averageFrequency += this.dataArray[i];
      };

  //find average
  averageFrequency = averageFrequency / this.bufferLength;
  return averageFrequency;
}


//sample song
//'https://api.soundcloud.com/tracks/184210017/stream?client_id=c751293c35f7cb00b48ee6383ea84aa6'
