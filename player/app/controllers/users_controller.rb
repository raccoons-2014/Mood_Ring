class UsersController < ApplicationController

  def connect
  	redirect_to CLIENT.authorize_url()
  end
end
