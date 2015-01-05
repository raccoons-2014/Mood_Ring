Rails.application.routes.draw do

  root 'welcome#player'

  match "/welcome/play" => "welcome#play", :as => 'play', via: [:get, :post]

  get '/soundcloud-callback' => 'users#connect'
  get '/soundcloud-connected' => 'users#connected'

  get '/soundcloud-disconnect' => 'users#disconnect'

  get '/songs/create' => 'songs#create'

  post '/songs/create' => 'songs#create'

  get '/songs/index' => 'songs#index'

end
