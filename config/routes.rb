Rails.application.routes.draw do

  root 'welcome#homepage'
  get 'welcome/ring' => "welcome#ring"
  get "welcome/player" => "welcome#player"
  
  get '/songs/create' => 'songs#create'

  post '/songs/create' => 'songs#create'

  get '/songs/index' => 'songs#index'

end

