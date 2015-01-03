module UsersHelper
  def current_user 
    @current_user ||= session[:user_id]
  end

  def login(user)
    session[:user_id] = user.id
  end

  def logout
    session.delete(:user_id)
    @current_user = nil
  end
end
