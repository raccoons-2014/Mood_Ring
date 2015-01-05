class SoundcloudClient
  attr_reader :client

  def initialize(opts)
    @client = Soundcloud.new(default_options.merge(token_options))
  end

  private


    def default_options
      {
        :client_id     => CLIENT.client_id,
        :client_secret => CLIENT.client_secret,
      }
    end

    def token_options
      {
        :expires_at    => soundcloud_expires_at,
        :access_token  => soundcloud_access_token,
        :refresh_token => soundcloud_refresh_token
      }
    end
end
