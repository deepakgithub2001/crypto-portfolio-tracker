# frozen_string_literal: true

module Portfolio
  class Broadcaster
    def self.call(user)
      data = Portfolio::Calculator.call(user)

      ActionCable.server.broadcast(
        "portfolio",
        {
          type: "PORTFOLIO_UPDATE",
          payload: data
        }
      )
    end
  end
end
