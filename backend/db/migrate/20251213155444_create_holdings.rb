class CreateHoldings < ActiveRecord::Migration[8.0]
  def change
    create_table :holdings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :coin_id
      t.decimal :quantity
      t.decimal :buy_price

      t.timestamps
    end
  end
end
