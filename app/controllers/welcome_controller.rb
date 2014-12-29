class WelcomeController < ApplicationController
  def index
    query_soundcloud(params[:mood_input])
    render :index
  end
end
