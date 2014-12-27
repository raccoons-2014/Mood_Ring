class UsersController < ApplicationController
	def connect
    #here we redirect to the soundcloud_client which asks the user to log in via soundcloud and if they want
    #our application to store their information
		redirect_to soundcloud_client.authorize_url
	end

  def connected
    #if there are no errors, run this code
	  if params[:error].nil?
      #we grab an exchange token so we can log in via Soundcloud
		  soundcloud_client.exchange_token(:code => params[:code])
      #user is set to the soundcloud_client
      user = soundcloud_client.get("/me")

      #we find or create the user in our database, which if you go to the console can then view
		  User.find_or_create_by(soundcloud_user_id: user.id)

      #we set a current user, which needs to be worked on
      @current_user = user

      #this will update a user's access tokens which are known to expire over time
    	@current_user.update_attributes!({
          :soundcloud_access_token  => soundcloud_client.access_token,
          :soundcloud_refresh_token => soundcloud_client.refresh_token,
          :soundcloud_expires_at    => soundcloud_client.expires_at,
        })
      end
    #finally we're redirected to the root path
    redirect_to root_path
  end

  #this part of the code's a little wonky, but I'm working on it
  def disconnect
    logout
    redirect_to root_path
  end
  
private
  
  #hardcoded parameters for the soundcloud_client. The redirect uri in our app is /soundcloud-connected
  def soundcloud_client
    return @soundcloud_client if @soundcloud_client
    @soundcloud_client = User.soundcloud_client(:redirect_uri  => soundcloud_connected_url)
  end

end