class UserController < ApplicationController
	def new
		redirect request_token.authorize_url
	end

	def create
	end

	def destroy
	end
end