# app/services/prices/fetcher.rb
module Prices
  class Fetcher
    def self.fetch(coin_ids)
      # mock data for now (safe start)
      coin_ids.index_with do |_coin|
        rand(50..5000)
      end
    end
  end
end
