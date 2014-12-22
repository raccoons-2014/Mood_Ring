# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

CLIENT = SoundCloud.new({
  :client_id     => ENV['SOUNDCLOUD_API'],
  :client_secret => ENV['SOUNDCLOUD_SECRET']
  redirect_to client.authorize_url()
})

