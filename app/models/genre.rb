class Genre < ActiveRecord::Base
  validates :type, uniqueness: true, presence: true

  belongs_to :song
end
