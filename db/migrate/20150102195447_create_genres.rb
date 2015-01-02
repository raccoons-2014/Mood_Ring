class CreateGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string     :name, default: "Unknown"
      t.references :song

      t.timestamps
    end
  end
end
