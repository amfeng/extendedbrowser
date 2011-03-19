class CreateWindows < ActiveRecord::Migration
    def self.up
      create_table :windows do |t|
        t.column :html, :text, :default => ''
        t.column :top, :integer, :default => 0
        t.column :left, :integer, :default => 0
        t.column :width, :integer, :default => 50
        t.column :height, :integer, :default => 50
        t.column :user_id, :integer
        #t.timestamps
      end
    end

    def self.down
      drop_table :windows
    end
  end
