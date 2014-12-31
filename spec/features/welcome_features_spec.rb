require 'rails_helper'

feature 'Music Player' do 
  scenario 'selecting a genre is possible' do 
  	visit root_path

  	expect(page).to have_text("genre")
  end

  scenario 'after selecting a genre, select mood' do 
  	visit root_path

  	click_button 'punk'
  	expect(page).to have_text("What mood of music are you feeling?")
  end

  scenario 'selecting a mood after selecting genre' do 
  	visit root_path 

  	click_button 'classical'
  	click_button 'Happy'
  	expect(page).to not_have_text("Choose or enter a mood")
  end
end