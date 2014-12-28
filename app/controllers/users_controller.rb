class UsersController < ApplicationController
	def connect
		redirect_to soundcloud_client.authorize_url
	end

  def connected
	  if params[:error].nil?
		  soundcloud_client.exchange_token(:code => params[:code])
      user = soundcloud_client.get("/me")

		  login(User.find_or_create_by(soundcloud_user_id: user.id))

    	@current_user.update_attributes!({
          :soundcloud_access_token  => soundcloud_client.access_token,
          :soundcloud_refresh_token => soundcloud_client.refresh_token,
          :soundcloud_expires_at    => soundcloud_client.expires_at,
        })
      end
    redirect_to root_path
    puts "****************************"
      p @current_user
      p logged_in?
  end

  def disconnect
    logout
    redirect_to root_path
    puts "((((((((((((((((((((("
      p @current_user
      p logged_in?
  end
  
private
  
  #hardcoded parameters for the soundcloud_client. The redirect uri in our app is /soundcloud-connected
  def soundcloud_client
    return @soundcloud_client if @soundcloud_client
    @soundcloud_client = User.soundcloud_client(:redirect_uri  => soundcloud_connected_url)
  end

end