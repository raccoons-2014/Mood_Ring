class Song < ActiveRecord::Base
  validates :title, :artist, :stream_url, :album_art, presence: true
  validates :stream_url, uniqueness: true

  has_many :moods
  has_many :genres
end
