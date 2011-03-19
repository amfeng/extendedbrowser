class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.column :height, :integer, :default => 500
      t.column :width, :integer, :default => 500
      t.column :toleft, :integer
      t.column :toright, :integer
      t.column :name, :string, :limit => 30, :default => ''
      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
