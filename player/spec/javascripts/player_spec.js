describe('player', function() {
	var player;

	beforeEach(function(){
		player = new PlayerWidget('sad');
		console.log(player)
	})

  it("selects the id of sad", function() {
  	console.log(this.player)
    expect(player.sourceSelector).toBe('sad')
  });
});