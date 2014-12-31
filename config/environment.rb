# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

SONG = Echonest::Song.new(ENV['ECHONEST_API_KEY'])

CLIENT = SoundCloud.new({
  :client_id     => ENV['SOUNDCLOUD_API'],
  :client_secret => ENV['SOUNDCLOUD_SECRET']
})

@spec = {:clientID => ENV['GRACENOTE_ID'], :clientTag => ENV['GRACENOTE_CLIENT_TAG']}
@obj = Gracenote.new(@spec)
@obj.registerUser
