require 'rails_helper'

describe UsersController, :type => :controller do

  context "after you click the connect button" do 
  	it "should redirect back to soundcloud" do 
      get :connect
      expect(response).to have_http_status(:redirect)
  	end
  end

  context "after you click the disconnect button" do 
    it "should redirect you back to the welcome page" do 
      get :disconnect 
      expect(response).to have_http_status(:redirect)
    end
  end
end
