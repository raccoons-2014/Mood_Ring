class SongsController < ApplicationController
  respond_to :html, :js

  def create
    Song.create(title: params[:title], stream_url: params[:stream_url], mood: params[:mood])
    redirect_to root_path
  end

  def index
    @songs = Song.where(mood: params[:mood])
    respond_to do |format|
      format.js {render :json => @songs}
    end
  end

end
