class UsersController < ApplicationController

  def new
  	@request = CLIENT
  	render :new
  end

  def connect
  	redirect_to CLIENT.authorize_url()
  end
end
