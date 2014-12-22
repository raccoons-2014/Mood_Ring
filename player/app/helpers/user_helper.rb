module UserHelper
  def current_user
    # if current user is nil then it will find the User and assign it to @current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def connect_to_soundcloud(param)
  	raise RuntimeError, "You must set CONSUMER_KEY and CONSUMER_SECRET in your server environment." unless ENV['CONSUMER_KEY'] && ENV['CONSUMER_SECRET']
  @consumer ||= OAuth::Consumer.new(
    ENV['SOUNDCLOUD_API'],
    ENV['SOUNDCLOUD_SECRET'],
  )
  end
end