describe('player', function() {
	var player;

	beforeEach(function(){
		player = new PlayerWidget('sad');
	})

  it("selects the id of sad", function() {
    expect(player.sourceSelector).toBe('sad')
  });
});