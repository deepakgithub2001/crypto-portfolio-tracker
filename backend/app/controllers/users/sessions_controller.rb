module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    def create
      user = User.find_by(email: params[:email])

      if user&.valid_password?(params[:password])
        token = JwtService.encode(user_id: user.id)

        render json: {
          token: token,
          user: {
            id: user.id,
            email: user.email
          }
        }, status: :ok
      else
        render json: { errors: ["Invalid Email or password."] }, status: :unauthorized
      end
    end

    def destroy
      render json: { message: "Logged out (JWT is client-side)" }, status: :ok
    end
  end
end
