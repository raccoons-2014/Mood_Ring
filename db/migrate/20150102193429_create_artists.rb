class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string     :name, null: false
      t.references :song, null: false

      t.timestamps
    end
  end
end
