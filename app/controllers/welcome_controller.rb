class WelcomeController < ApplicationController
	
  def connect 
  	render :connect
  end
  		
  def player
  	if current_user
      render :player
  	else
  	  redirect_to root_path
  	end
  end
end
