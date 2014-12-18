class WelcomeController < ApplicationController
  def index
    @tracks = CLIENT.get('/tracks', limit: 10, genre: params[:genre])
    render :index
  end
end
