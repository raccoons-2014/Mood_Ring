class WelcomeController < ApplicationController

  def player
    render :player
  end

  def ring
    render :partial => "ring"
  end

  def greet
    render :homepage
  end

end
