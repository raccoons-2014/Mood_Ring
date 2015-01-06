class User < ActiveRecord::Base
  validates :soundcloud_user_id, presence: true, uniqueness: true
end
