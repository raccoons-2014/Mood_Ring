# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'


20.times do (Song.create(title: Faker::Lorem.sentence,
						 artist: Faker::Name.name, 
						 stream_url: Faker::Internet.url, 
						 album_art: Faker::Avatar.image,
						 genre: Faker::Lorem.word,
						 mood: Faker::Lorem.word))
end