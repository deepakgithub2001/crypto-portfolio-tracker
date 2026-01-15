# lib/tasks/price_ticker_runner.rb
loop do
  puts "⏱ TICK at #{Time.now}"
  MockPriceTicker.tick!
  sleep 3
end
