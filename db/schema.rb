# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100206123329) do

  create_table "notgots", :force => true do |t|
    t.integer "user_id"
    t.integer "window_id"
  end

  add_index "notgots", ["user_id"], :name => "index_notgots_on_user_id"

  create_table "pictures", :force => true do |t|
    t.string   "filename"
    t.string   "content_type"
    t.integer  "size"
    t.integer  "width"
    t.integer  "height"
    t.integer  "parent_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.integer  "height",                   :default => 500
    t.integer  "width",                    :default => 500
    t.integer  "toleft"
    t.integer  "toright"
    t.string   "name",       :limit => 30, :default => ""
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "windows", :force => true do |t|
    t.text    "html",    :default => ""
    t.integer "top",     :default => 0
    t.integer "left",    :default => 0
    t.integer "width",   :default => 50
    t.integer "height",  :default => 50
    t.integer "user_id"
  end

end
