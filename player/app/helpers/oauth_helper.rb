module OauthHelper
  def oauth_consumer
    raise RuntimeError, "You must set SOUNDCLOUD_API and SOUNDCLOUD_SECRET in your server environment." unless ENV['SOUNDCLOUD_API'] && ENV['SOUNDCLOUD_SECRET']
    @consumer ||= OAuth::Consumer.new(
      ENV['SOUNDCLOUD_API'],
      ENV['SOUNDCLOUD_SECRET'],
      :site => "amixofpersons.github.io"
    )
  end

  def request_token
    if not session[:request_token]
    # this 'host_and_port' logic allows our app to work both locally and on Heroku
      host_and_port = request.host
      host_and_port << ":9393" if request.host == "localhost"

      # the `oauth_consumer` method is defined above
      session[:request_token] = oauth_consumer.get_request_token(
        :oauth_callback => "http://#{host_and_port}/auth"
      )
    end
    session[:request_token]
  end
end