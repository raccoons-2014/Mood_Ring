module UserHelper
	def current_user
    # if current user is nil then it will find the User and assign it to @current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
end