describe("echonest", function() {
  var playlist;

  beforeEach(function() {
  	playlist.getEchoNestTracks("anger");
    playlist = new PlayerWidget(tracks);
  });

  it("should be able to play a Song", function() {
    expect(playlist).toBe(true)
  });
});
