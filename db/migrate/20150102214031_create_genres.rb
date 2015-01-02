class CreateGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string   :kind, default: "Unknown"

      t.timestamps
    end
  end
end
