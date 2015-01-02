require 'rails_helper'

feature 'Music Player' do 
  scenario 'you must be signed in to use the music player' do 
  	visit player_path

  	expect(page).to_not have_content("genre")
  end
end