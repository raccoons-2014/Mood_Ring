module UserHelper
  def connect_user(param)
  	@user = CLIENT.get('/new', params[:client_id])
  end
end