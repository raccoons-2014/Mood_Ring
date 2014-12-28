module WelcomeHelper
  def query_soundcloud(param)
    @tracks = CLIENT.get('/tracks', limit: 10, tags: param)
  end
end
