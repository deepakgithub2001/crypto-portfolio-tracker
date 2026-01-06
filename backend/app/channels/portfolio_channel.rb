# app/channels/portfolio_channel.rb
class PortfolioChannel < ApplicationCable::Channel
  def subscribed
    stream_from "portfolio"
  end

  def unsubscribed
  end
end
