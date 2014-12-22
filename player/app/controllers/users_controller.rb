class UsersController < ApplicationController

  def new
  	@request = CLIENT
  	render :new
  end

  def create
  end

  def destroy
  end
end
