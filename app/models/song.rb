class Song < ActiveRecord::Base
  validates :title, :artist, :stream_url, :album_art, :genre, presence: true
  validates :stream_url, :uniqueness: true
end
