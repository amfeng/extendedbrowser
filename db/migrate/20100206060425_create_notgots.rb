class CreateNotgots < ActiveRecord::Migration
  def self.up
    create_table :notgots do |t|
      t.column :user_id, :integer
      t.column :window_id, :integer
      #t.timestamps
    end
    add_index :notgots, :user_id
  end

  def self.down
    drop_table :notgots
  end
end
