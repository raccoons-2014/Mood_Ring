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
});