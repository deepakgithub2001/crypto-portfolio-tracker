module Api
  module V1
    class PortfolioController < ApplicationController
      def index
        data = Portfolio::Calculator.call(current_user)
        render json: { portfolio: data }
      end
    end
  end
end
