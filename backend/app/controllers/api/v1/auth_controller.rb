# app/controllers/api/v1/auth_controller.rb
module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_request, only: [:signup, :login]

      # POST /api/v1/auth/signup
      def signup
        user = User.new(user_params)
        if user.save
          token = JwtService.encode(user_id: user.id)
          render json: { token: token, user: { id: user.id, email: user.email } }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # POST /api/v1/auth/login
      def login
        user = User.find_by(email: params[:email])
        if user&.valid_password?(params[:password])
          token = JwtService.encode(user_id: user.id)
          render json: { token: token, user: { id: user.id, email: user.email } }
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
