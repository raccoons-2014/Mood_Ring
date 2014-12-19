require 'rails_helper'

describe WelcomeController, :type => :controller do
  context "when you go to the index page" do
    it "should render the index template" do
      get :index
      expect(response).to be_success
    end
  end
end
