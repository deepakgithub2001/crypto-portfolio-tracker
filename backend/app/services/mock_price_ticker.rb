# app/services/mock_price_ticker.rb
class MockPriceTicker
  COINS = %w[bitcoin ethereum solana cardano]

  @@prices = {
    "bitcoin"  => 45000,
    "ethereum" => 3200,
    "solana"   => 110,
    "cardano"  => 0.55
  }

  def self.tick!
    updated = {}

    COINS.each do |coin|
      old_price = @@prices[coin]
      change = rand(-0.03..0.03) # ±3%
      new_price = (old_price * (1 + change)).round(2)

      @@prices[coin] = new_price

      updated[coin] = {
        price: new_price,
        previous_price: old_price
      }
    end

    ActionCable.server.broadcast(
  "prices",
  {
    type: "PRICE_TICK",
    prices: updated
  }
)

puts "📡 Broadcast sent:", updated

  end
end
