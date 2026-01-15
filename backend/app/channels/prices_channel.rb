# app/channels/prices_channel.rb
class PricesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "prices"
  end

  def unsubscribed
    # cleanup if needed
  end
end
