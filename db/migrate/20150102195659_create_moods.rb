class CreateMoods < ActiveRecord::Migration
  def change
    create_table :moods do |t|
      t.string     :feeling
      t.references :song

      t.timestamps
    end
  end
end
