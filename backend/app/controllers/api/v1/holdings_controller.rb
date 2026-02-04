# app/controllers/api/v1/holdings_controller.rb
module Api
  module V1
    class HoldingsController < ApplicationController
      before_action :authenticate_request

      # ----------------------------------
      # GET /api/v1/holdings
      # ----------------------------------
      def index
        holdings = current_user.holdings

        coin_ids = holdings.pluck(:coin_id).map(&:downcase)
        prices   = CoinGecko::Client.prices(coin_ids)

        data = holdings.map do |holding|
          current_price = prices.dig(holding.coin_id.downcase, "usd") || 0
          profit_loss   = (current_price - holding.buy_price) * holding.quantity

          {
            id: holding.id,
            coin: holding.coin_id,
            quantity: holding.quantity.to_f,
            buy_price: holding.buy_price.to_f,
            current_price: current_price.to_f,
            profit_loss: profit_loss.to_f
          }
        end

        render json: data
      end

      # ----------------------------------
      # POST /api/v1/holdings
      # ----------------------------------
      def create
        holding = current_user.holdings.new(holding_params)

        if holding.save
          render json: serialize_holding(holding), status: :created
        else
          render json: { errors: holding.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # ----------------------------------
      # PATCH /api/v1/holdings/:id
      # ----------------------------------
      def update
        holding = current_user.holdings.find(params[:id])

        if holding.update(holding_params)
          render json: serialize_holding(holding)
        else
          render json: { errors: holding.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # ----------------------------------
      # DELETE /api/v1/holdings/:id
      # ----------------------------------
      def destroy
        holding = current_user.holdings.find(params[:id])
        holding.destroy

        render json: { message: "Holding deleted" }
      end

      private

      # ----------------------------------
      # Strong Params
      # ----------------------------------
      def holding_params
        params.require(:holding).permit(:coin_id, :quantity, :buy_price)
      end

      # ----------------------------------
      # Serializer (for create/update)
      # ----------------------------------
      def serialize_holding(holding)
        invested_value = holding.quantity * holding.buy_price

        {
          id: holding.id,
          coin: holding.coin_id,
          quantity: holding.quantity,
          buy_price: holding.buy_price,
          invested_value: invested_value,
          current_value: invested_value,
          profit_loss: 0
        }
      end
    end
  end
end
