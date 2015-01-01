class WelcomeController < ApplicationController
	
  def connect 
  	render :connect
  end
  		
  def player
    render :player
  end
end
