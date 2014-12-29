class WelcomeController < ApplicationController
  def index
    query_soundcloud(params[:mood_input])
    render :index
    puts "++++++++++++++++++++++++++++"
    p @current_user
  end
end
