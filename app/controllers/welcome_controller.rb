class WelcomeController < ApplicationController
  def index
    # query_soundcloud(params[:mood_input])
    params = { mood: "sad^.5", results: 10, min_tempo: 130, max_tempo: 150 }
    p SONG.search(params)
    render :index
  end
end
