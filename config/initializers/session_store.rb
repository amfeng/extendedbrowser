# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_hack2_session',
  :secret      => '23f9e17e8cce06e7fef2aceae62928888b8a1646a66b732b8e3adb222c69fb87893707a3284c2e69da7ca74d9204666abc8247e60b1076d29453ed882c0e3f2e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
