require 'rails_helper'

feature 'Oauth Soundcloud Signin' do 
  scenario 'User must sign into Soundcloud' do 
  	visit soundcloud_callback_path

  	expect(page).to have_text('Mood Ring')
  end
end