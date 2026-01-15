namespace :prices do
  desc "Start mock price ticker"
  task tick: :environment do
    puts "🚀 Mock price ticker started..."

    loop do
      MockPriceTicker.tick!
      sleep 3
    end
  end
end
