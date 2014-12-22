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