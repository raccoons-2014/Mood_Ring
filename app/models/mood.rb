class Mood < ActiveRecord::Base
  validates :feeling, uniqueness: true, presence: true
end
