module SessionsHelper
  #method current_user
  def current_user
    @current_user ||= User.find_by(id: session[:soundcloud_user_id])
  end

  def login(user)
    @current_user = user
    session[:current_user_id] = user.try(:id)
  end

  def logout
    session.delete(:current_user_id)
    @current_user = nil
  end
end
