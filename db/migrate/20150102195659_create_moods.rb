class CreateMoods < ActiveRecord::Migration
  def change
    create_table :moods do |t|
      t.string     :feeling, null: false

      t.timestamps
    end
  end
end