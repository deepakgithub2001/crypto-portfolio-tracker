Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  namespace :api do
    namespace :v1 do
      # Authentication
      post "auth/signup", to: "auth#signup"
      post "auth/login",  to: "auth#login"

      # Protected resources
      resources :holdings
      get "portfolio", to: "portfolio#index"
    end
  end
end
