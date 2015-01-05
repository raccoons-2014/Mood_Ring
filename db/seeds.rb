# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Song.create(title: 'Mortified', stream_url: "https://api.soundcloud.com/tracks/184532324", mood: "happy")
Song.create(title: 'Sequentiality', stream_url: "https://api.soundcloud.com/tracks/184532322", mood: "happy")
Song.create(title: 'You Have Chosen Wisely', stream_url: "https://api.soundcloud.com/tracks/184532318", mood: "happy")
