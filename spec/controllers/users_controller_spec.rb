require 'rails_helper'

describe UsersController, :type => :controller do

  context "after you click the connect button" do 
  	it "should redirect back to soundcloud" do 
      get :connect
      expect(response).to have_http_status 302
  	end
  end
end
