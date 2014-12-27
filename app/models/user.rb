class User < ActiveRecord::Base

  #current problem: hardcoded client id and secret. I tried using ENV earlier,
  #but for some strange reason it returns an error saying that the client id
  #and secret are undefined?

  SOUNDCLOUD_CLIENT_ID     = "5b91135eafaf701ea414c5fe6b86fdf3"
  SOUNDCLOUD_CLIENT_SECRET = "a51b5d3050edbbd343780cd99d3cb469"


  def self.soundcloud_client(options={})
    #defining soundcloud id and secret for the class User
    options = {
      :client_id     => SOUNDCLOUD_CLIENT_ID,
      :client_secret => SOUNDCLOUD_CLIENT_SECRET,
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
