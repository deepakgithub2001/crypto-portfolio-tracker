# app/services/mock_price_store.rb
class MockPriceStore
  PRICES = {
    bitcoin: 44_000.0,
    ethereum: 2_400.0,
    solana: 98.0,
    cardano: 0.55
  }

  def self.all
    PRICES
  end

  def self.update!(coin, price)
    PRICES[coin] = price
  end
end
