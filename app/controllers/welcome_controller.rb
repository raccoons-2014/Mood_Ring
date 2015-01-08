class WelcomeController < ApplicationController
	
  def ring
    render :partial => "ring"
  end

  def homepage
    render :index
  end

end
