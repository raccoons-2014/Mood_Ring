class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string	   :title, null: false
      t.string     :artist, null: false
      t.string     :stream_url, null: false
      t.string     :album_art, null: false
      t.references :genre
      t.references :mood

      t.timestamps
    end
  end
end
