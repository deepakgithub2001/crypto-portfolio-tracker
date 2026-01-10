class AddCurrentPriceToHoldings < ActiveRecord::Migration[8.0]
  def change
      add_column :holdings, :current_price, :decimal, precision: 15, scale: 2
  end
end
