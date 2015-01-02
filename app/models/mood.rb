class Mood < ActiveRecord::Base
  validates :feeling, uniqueness: true, presence: true

  belongs_to :song
end
