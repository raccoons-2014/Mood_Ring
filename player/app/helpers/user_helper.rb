module UserHelper
  def connect_user(param)
  	@user = CLIENT.get('/new')
  end
end