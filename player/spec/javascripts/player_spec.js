describe('player', function() {
	var sad_player;

  beforeEach(function(){
	sad_player = new PlayerWidget('sad');
  })

  describe('sourceSelector', function(){
  	it("selects the id of sad", function() {
      expect(sad_player.sourceSelector).toBe('sad')
  	});
  })

  describe('current_track', function(){
  	it('returns the current track information', function(){
  		expect(sad_player.current_track).toContain("soundcloud")
  	})
  })

  describe('populateTrackInfo', function(){
  	it("calls current_track_title to display it on the playlist", function(){
  		expect(sad_player.current_track_title).toHaveBeenCalled();
  	})
  })

  describe('resetCurrentTrack', function(){
  	it('changes the current_track', function(){
  		var old_track_title = sad_player.current_track_title;
  		sad_player.resetCurrentTrack();
  		expect(sad_player.current_track_title).not.toBe(old_track_title);
  	})
  })

  describe('streamSong', function(){
  	it('plays a song', function(){
  		sad_player.streamSong();
  		expect(sound.play()).toHaveBeenCalled;
  	})
  })
});