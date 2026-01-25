require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 8.0

    config.autoload_lib(ignore: %w[assets tasks])
    config.action_cable.mount_path = nil
    # API-only app
    config.api_only = true
  end
end
