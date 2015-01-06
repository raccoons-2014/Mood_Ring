class UsersController < ApplicationController
	def connect
		redirect_to soundcloud_login
	end

  def connected
	  if params[:error].nil?
      CLIENT.exchange_token(:code => params[:code])
      user = CLIENT.get("/me")

      login(User.find_or_create_by(soundcloud_user_id: user.id, soundcloud_username: user.username))

    	user.update_attributes!({
          :soundcloud_access_token  => CLIENT.access_token,
          :soundcloud_refresh_token => CLIENT.refresh_token,
          :soundcloud_expires_at    => CLIENT.expires_at,
      })
    end
    session[:user_id] = user.id
    redirect_to welcome_player_path
  end

  def disconnect
    logout
    redirect_to welcome_player_path
  end

private

    # return @soundcloud_client if @soundcloud_client
  def soundcloud_login
      soundcloud_login = CLIENT.authorize_url(redirect_uri: soundcloud_connected_url)
  end
end
