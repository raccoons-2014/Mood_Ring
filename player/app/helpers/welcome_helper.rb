module WelcomeHelper

  def query_soundcloud(param)
    @tracks = CLIENT.get('/tracks', limit: 10, genre: param)

  end

end
