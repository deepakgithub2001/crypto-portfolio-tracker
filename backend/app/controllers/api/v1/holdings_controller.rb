# app/controllers/api/v1/holdings_controller.rb
module Api
  module V1
    class HoldingsController < ApplicationController
      before_action :authenticate_request

      # GET /api/v1/holdings
      def index
        holdings = current_user.holdings

        serialized_holdings = holdings.map { |h| serialize_holding(h) }

        render json: {
          portfolio: {
            holdings: serialized_holdings,
            summary: portfolio_summary(serialized_holdings)
          }
        }
      end

      # POST /api/v1/holdings
      def create
        holding = current_user.holdings.new(holding_params)

        if holding.save
          render json: serialize_holding(holding), status: :created
        else
          render json: { errors: holding.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/holdings/:id
      def update
        holding = current_user.holdings.find(params[:id])

        if holding.update(holding_params)
          render json: serialize_holding(holding)
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

      # -------------------- NORMALIZATION --------------------

      def serialize_holding(holding)
        current_price = holding.current_price || holding.buy_price

        invested_value = holding.quantity * holding.buy_price
        current_value  = holding.quantity * current_price

        {
          id: holding.id,
          coin: holding.coin_id,
          quantity: holding.quantity,
          buy_price: holding.buy_price,
          current_price: current_price,
          invested_value: invested_value,
          current_value: current_value,
          profit_loss: current_value - invested_value
        }
      end

      def portfolio_summary(holdings)
        {
          invested: holdings.sum { |h| h[:invested_value] },
          current: holdings.sum { |h| h[:current_value] },
          profit_loss: holdings.sum { |h| h[:profit_loss] }
        }
      end
    end
  end
end
