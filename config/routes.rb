Rails.application.routes.draw do

  root 'welcome#player'

  # get "welcome/play" => "welcome#play"
  get "welcome/greet" => "welcome#greet"

  get '/soundcloud-callback' => 'users#connect'
  get '/soundcloud-connected' => 'users#connected'

  get '/soundcloud-disconnect' => 'users#disconnect'

  get '/songs/create' => 'songs#create'

  post '/songs/create' => 'songs#create'

  get '/songs/index' => 'songs#index'

end
