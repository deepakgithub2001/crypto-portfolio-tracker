# app/controllers/api/v1/holdings_controller.rb
module Api
  module V1
    class HoldingsController < ApplicationController
      # GET /api/v1/holdings
      def index
        render json: { holdings: current_user.holdings }
      end

      # POST /api/v1/holdings
      def create
        holding = current_user.holdings.new(holding_params)
        if holding.save
          render json: holding, status: :created
        else
          render json: { errors: holding.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/holdings/:id
      def update
        holding = current_user.holdings.find(params[:id])
        if holding.update(holding_params)
          render json: holding
        else
          render json: { errors: holding.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/holdings/:id
      def destroy
        holding = current_user.holdings.find(params[:id])
        holding.destroy
        render json: { message: "Holding deleted" }
      end

      private

      def holding_params
        params.require(:holding).permit(:coin_id, :quantity, :buy_price)
      end
    end
  end
end
