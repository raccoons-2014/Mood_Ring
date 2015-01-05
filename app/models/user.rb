class User < ActiveRecord::Base
  validates :soundcloud_user_id, presence: true, uniqueness: true

  def soundcloud_client(options={})
    options.merge!()

    client = SoundcloudClient.new(options).client

    client.on_exchange_token do
      update_attributes!({
        :soundcloud_access_token  => client.access_token,
        :soundcloud_refresh_token => client.refresh_token,
        :soundcloud_expires_at    => client.expires_at,
      })
    end

    client
  end


end
