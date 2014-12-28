class User < ActiveRecord::Base

  #current problem: hardcoded client id and secret. I tried using ENV earlier,
  #but for some strange reason it returns an error saying that the client id
  #and secret are undefined?

  def self.soundcloud_client(options={})
    #defining soundcloud id and secret for the class User
    options = {
      :client_id     => CLIENT.client_id,
      :client_secret => CLIENT.client_secret,
    }.merge(options)

    Soundcloud.new(options)
  end
  
  
  def soundcloud_client(options={})
    #here we specify what our access and refresh token are so that later
    #if an access token expires it can be refreshed
    options= {
      :expires_at    => soundcloud_expires_at,
      :access_token  => soundcloud_access_token,
      :refresh_token => soundcloud_refresh_token
    }.merge(options)
    
    #create a client
    client = self.class.soundcloud_client(options)
    
    # define a callback for successful token exchanges
    # this will make sure that new access_tokens are persisted once an existing 
    # access_token expired and a new one was retrieved from the soundcloud api
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
