module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json
    skip_before_action :verify_authenticity_token

    def create
      user = User.new(sign_up_params)
      if user.save
        sign_in(user)
        render json: { user: user_response(user), message: 'Signed up' }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def user_response(user)
      { id: user.id, email: user.email }
    end
  end
end
