module UsersHelper
  def login(user)
    @current_user = user
    session[:current_user_id] = user.try(:id)
  end

  def logged_in?
    !!@current_user
  end  

  def logout
    session.delete(:current_user_id)
    @current_user = nil
  end
end
