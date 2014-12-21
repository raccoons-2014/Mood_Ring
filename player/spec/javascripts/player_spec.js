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
});