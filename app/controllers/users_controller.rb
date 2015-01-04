class UsersController < ApplicationController
	def connect
		redirect_to soundcloud_client.authorize_url
	end

  def connected
	  if params[:error].nil?
      soundcloud_client.exchange_token(:code => params[:code])
      user = soundcloud_client.get("/me")

      login(User.find_or_create_by(soundcloud_user_id: user.id, soundcloud_username: user.username))

    	user.update_attributes!({
          :soundcloud_access_token  => soundcloud_client.access_token,
          :soundcloud_refresh_token => soundcloud_client.refresh_token,
          :soundcloud_expires_at    => soundcloud_client.expires_at,
      })
    end
    session[:user_id] = user.id
    redirect_to root_path
  end

  def disconnect
    logout
    redirect_to root_path
  end

private

  def soundcloud_client
    return @soundcloud_client if @soundcloud_client
    #for local host
    # @soundcloud_client = User.soundcloud_client(:redirect_uri  => soundcloud_connected_url)
    #for heroku
    @soundcloud_client = User.soundcloud_client(:redirect_uri  => 'http://moodringradio.herokuapp.com/callback.html')
  end
end
