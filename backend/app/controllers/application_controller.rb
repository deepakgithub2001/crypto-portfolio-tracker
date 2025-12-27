# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  before_action :authenticate_request

  attr_reader :current_user

  private

  def authenticate_request
    header = request.headers["Authorization"]
    token  = header&.split(" ")&.last

    return unauthorized("Missing token") unless token

    decoded = JwtService.decode(token) 
    return unauthorized("Your token has been expired, please login again.") unless decoded

    user_id = decoded["user_id"] || decoded[:user_id]
    return unauthorized("Invalid payload") unless user_id

    @current_user = User.find_by(id: user_id)
    return unauthorized("Invalid payload") unless @current_user
  rescue ActiveRecord::RecordNotFound
    unauthorized("User not found")
  end

  def unauthorized(message)
    render json: { error: message }, status: :unauthorized
  end
end
