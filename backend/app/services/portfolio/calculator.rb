module Portfolio
  class Calculator
    def self.call(user)
      holdings = user.holdings
      return empty_response if holdings.empty?

      coin_ids = holdings.pluck(:coin_id).uniq
      prices = CoinGecko::Client.prices(coin_ids)

      portfolio = []
      total_invested = 0.0
      total_current  = 0.0

      holdings.each do |holding|
        price = prices.dig(holding.coin_id, "usd").to_f

        invested_value = holding.buy_price.to_f * holding.quantity.to_f
        current_value  = price * holding.quantity.to_f

        total_invested += invested_value
        total_current  += current_value

        portfolio << {
          id: holding.id,
          coin: holding.coin_id,
          quantity: holding.quantity,
          buy_price: holding.buy_price,
          current_price: price,
          invested_value: invested_value,
          current_value: current_value,
          profit_loss: current_value - invested_value
        }
      end

      {
        summary: {
          invested: total_invested,
          current: total_current,
          profit_loss: total_current - total_invested
        },
        portfolio: portfolio
      }
    end

    def self.empty_response
      {
        summary: {
          invested: 0,
          current: 0,
          profit_loss: 0
        },
        portfolio: []
      }
    end
  end
end
