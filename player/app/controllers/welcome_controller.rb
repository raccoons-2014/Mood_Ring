class WelcomeController < ApplicationController
  def index
    @tracks = CLIENT.get('/tracks', limit: 10, tags: params[:genre])
    render :index
  end

  def play

  end

end
