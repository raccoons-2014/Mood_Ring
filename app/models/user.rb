class User < ActiveRecord::Base
  validates :soundcloud_user_id, presence: true, uniqueness: true

  def self.soundcloud_client(options={})
    options = {
      :client_id     => CLIENT.client_id,
      :client_secret => CLIENT.client_secret,
    }.merge(options)

    Soundcloud.new(options)
  end


  def soundcloud_client(options={})
    options= {
      :expires_at    => soundcloud_expires_at,
      :access_token  => soundcloud_access_token,
      :refresh_token => soundcloud_refresh_token
    }.merge(options)

    client = self.class.soundcloud_client(options)

    client.on_exchange_token do
      self.update_attributes!({
        :soundcloud_access_token  => client.access_token,
        :soundcloud_refresh_token => client.refresh_token,
        :soundcloud_expires_at    => client.expires_at,
      })
    end

    client
  end
end
