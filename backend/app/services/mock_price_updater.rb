# app/services/mock_price_updater.rb
class MockPriceUpdater
  MIN_CHANGE = -0.03  # -3%
  MAX_CHANGE =  0.03  # +3%

  def initialize(asset)
    @asset = asset
  end

  def call
    old_price = @asset.current_price
    return if old_price.nil? || old_price <= 0

    change_factor = 1 + random_change
    new_price = (old_price * change_factor).round(2)

    # Safety check
    new_price = 0.01 if new_price <= 0

    @asset.update!(current_price: new_price)

    {
      asset_id: @asset.id,
      old_price: old_price,
      new_price: new_price
    }
  end

  private

  def random_change
    rand(MIN_CHANGE..MAX_CHANGE)
  end
end
