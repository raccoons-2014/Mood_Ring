class WelcomeController < ApplicationController

  def player
    render :player
  end

  def greet
    render :homepage
    # respond_to do |format|
    #   format.html { render :partial => 'homepage' }
    # end
  end

end
