class WelcomeController < ApplicationController

  def player
    render :player
  end

  def greet
    respond_to do |format|
      format.html { render :partial => 'homepage' } # index.html.erb
      # format.json { render json: @results, :callback => params[:callback] }
    end
  end

end
