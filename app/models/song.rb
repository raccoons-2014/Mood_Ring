class Song < ActiveRecord::Base
  validates :title, :mood, :stream_url, presence: true
end
