class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer   :soundcloud_user_id, null: false
      t.string    :soundcloud_username, null: false
      t.string    :soundcloud_access_token
      t.string    :soundcloud_refresh_token
      t.datetime  :soundcloud_expires_at

      t.timestamps
    end
  end
end
