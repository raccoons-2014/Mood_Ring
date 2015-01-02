class Genre < ActiveRecord::Base
  validates :kind, uniqueness: true, presence: true

  belongs_to :song
end
