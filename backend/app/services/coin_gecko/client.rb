require "net/http"
require "json"

module CoinGecko
  class Client
    BASE_URL = "https://api.coingecko.com/api/v3"

    def self.prices(coin_ids)
      return {} if coin_ids.blank?

      uri = URI("#{BASE_URL}/simple/price")
      uri.query = URI.encode_www_form(
        ids: coin_ids.join(","),
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
