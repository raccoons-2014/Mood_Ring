describe('player', function() {
	var sad_player;

  beforeEach(function(){
	sad_player = new PlayerWidget('sad');
  })

  it("selects the id of sad", function() {
  	console.log(this.player)
    expect(player.sourceSelector).toBe('sad')
	var orange = 'orange';
  it("does something", function() {
    expect(orange).toBe('grape');
	})

  it("selects the id of sad", function() {
  	console.log(this.player)
    expect(player.sourceSelector).toBe('sad')
  });
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
  		expect(sad_player.streamSong())
  	})
  })
});