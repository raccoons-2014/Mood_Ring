class UsersController < ApplicationController
	def connect
		redirect_to CLIENT.authorize_url(:display => "popup")
	end

  def connected
	  if params[:error].nil?
		CLIENT.exchange_token(:code => params[:code])

		login(User.find_or_create_by_soundcloud_user_id({
		  :soundcloud_user_id => user.id,
		  :soundcloud_username => user.name
		}))

    	current_user.update_attributes!({
          :soundcloud_access_token  => soundcloud_client.access_token,
          :soundcloud_refresh_token => soundcloud_client.refresh_token,
          :soundcloud_expires_at    => soundcloud_client.expires_at,
        })
      end
    render :layout => false
  end

  def disconnect
    login_as nil
    redirect_to root_path
  end
  
private

  def soundcloud_client
    return @soundcloud_client if @soundcloud_client
    @soundcloud_client = User.soundcloud_client(:redirect_uri  => soundcloud_connected_url)
  end

end