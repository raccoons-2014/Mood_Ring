class Song < ActiveRecord::Base
  validates :title, :artist, :stream_url, :album_art, :mood, presence: true
  validates :stream_url, :genre, :mood, uniqueness: true
end
