class WelcomeController < ApplicationController

  def player
    render :player
  end

  def greet
    render :homepage
  end

end
