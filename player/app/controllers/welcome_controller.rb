class WelcomeController < ApplicationController
  def index
    query_soundcloud(params[:landing_genre])
    render :index
  end
end
