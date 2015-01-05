class SongsController < ApplicationController
  respond_to :html, :js

  def new
    respond_to do |format|
      format.html {
        @post = Post.new
      }
      format.js {
        @post = Post.new
      }
    end
  end

  def create
    @song = Song.new(title: params[:title], stream_url: params[:stream_url], mood: params[:mood])
    respond_to do |format|
      format.html {
        @song.save
        redirect_to root_path
      }
      format.js {
        @song.save
        redirect_to root_path
      }
    end
  end

end
