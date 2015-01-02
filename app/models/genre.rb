class Genre < ActiveRecord::Base
  validates :name, uniqueness: true, presence: true

  belongs_to :songs
end
