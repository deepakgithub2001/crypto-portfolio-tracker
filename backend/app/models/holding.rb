# app/models/holding.rb
class Holding < ApplicationRecord
  belongs_to :user

  validates :coin_id, presence: true   # e.g. "bitcoin"
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :buy_price, presence: true, numericality: { greater_than: 0 }
end
