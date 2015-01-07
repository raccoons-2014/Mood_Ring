# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Sleepy
Song.create(title: 'Adventure Time - Sleepy Puppies', stream_url: 'https://api.soundcloud.com/tracks/28761782/stream', mood: "Sleepy")
Song.create(title: 'Benjamin Francis Leftwich - Atlas Hands', stream_url: 'https://api.soundcloud.com/tracks/39533372/stream', mood:'Sleepy')
Song.create(title: "Atlas - Coldplay", stream_url: "https://api.soundcloud.com/tracks/120434119/stream", mood: 'Sleepy')

#Happy
Song.create(title: 'Happy - Pharrel william', stream_url: "https://api.soundcloud.com/tracks/144773970/stream", mood: 'Happy')
Song.create(title: 'Happy - Never Shout Never', stream_url: "https://api.soundcloud.com/tracks/2394840/stream", mood: 'Happy')
Song.create(title: "I Caught Myself - Paramore", stream_url: "https://api.soundcloud.com/tracks/4486989/stream", mood: 'Happy')

#Sad
Song.create(title: "Service And Sacrifice", stream_url: "https://api.soundcloud.com/tracks/164353339/stream", mood: 'Melancholy')
Song.create(title: "NeYo - Mad", stream_url: "https://api.soundcloud.com/tracks/85986175/stream", mood: 'Melancholy')
Song.create(title: "how to never stop being sad", stream_url: "https://api.soundcloud.com/tracks/71204300/stream", mood: 'Melancholy')

#Angry
Song.create(title: "Three Days Grace - I Hate Everything About You", stream_url: "https://api.soundcloud.com/tracks/181267250/stream", mood: 'Angry')
Song.create(title: "Steven Universe - Synchronize/Sugilite", stream_url: "https://api.soundcloud.com/tracks/165861330/stream", mood: 'Angry')
Song.create(title: "Andrew W.K - Ready to Die", stream_url: "https://api.soundcloud.com/tracks/45572256/stream", mood: 'Angry')

#Excited
Song.create(title: "Zizibum by X-Ray", stream_url: "https://api.soundcloud.com/tracks/25728427/stream", mood: 'Excited')
Song.create(title: "Pepper Steak - OFF", stream_url: "https://api.soundcloud.com/tracks/75790279/stream", mood: 'Excited')
Song.create(title: "M.O.O.N. - Hydrogen", stream_url: "https://api.soundcloud.com/tracks/57180067/stream", mood: 'Excited')

#Chill
Song.create(title: "This ain't no place for a hero!", stream_url: "https://api.soundcloud.com/tracks/163175401/stream", mood: 'Chill')
Song.create(title: "Paradise - Coldplay (Dubstep Remix)", stream_url: "https://api.soundcloud.com/tracks/50056779/stream", mood: 'Chill')
Song.create(title: "Snoop Dogg vs The Doors - Riders On the Storm", stream_url: "https://api.soundcloud.com/tracks/307505/stream", mood: 'Chill')