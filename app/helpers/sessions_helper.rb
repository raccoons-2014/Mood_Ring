module SessionsHelper
  def current_user
    @current_user ||= User.find_by(id: session[:soundcloud_user_id])
  end

  def login(user)
    session[:soundcloud_user_id] = user.id
  end

  def logout
    session.delete(:soundcloud_user_id)
    @current_user = nil
  end
end
