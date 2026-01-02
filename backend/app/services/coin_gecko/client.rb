require "net/http"
require "json"

module CoinGecko
  class Client
    BASE_URL = "https://api.coingecko.com/api/v3"
    CACHE_TTL = 1.minute

    def self.prices(coin_ids)
      return {} if coin_ids.blank?

      cache_key = "coingecko:prices:#{coin_ids.sort.join(',')}"

      Rails.cache.fetch(cache_key, expires_in: CACHE_TTL) do
        fetch_prices(coin_ids)
      end
    end

    def self.fetch_prices(coin_ids)
      uri = URI("#{BASE_URL}/simple/price")
      uri.query = URI.encode_www_form(
        ids: coin_ids.map(&:downcase).join(","),
        vs_currencies: "usd"
      )

      response = Net::HTTP.get(uri)
      JSON.parse(response)
    rescue StandardError => e
      Rails.logger.error("CoinGecko Error: #{e.message}")
      {}
    end
  end
end
