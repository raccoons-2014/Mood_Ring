# Notes

## Junk

* Junk in `vendor/*.js`: rm it
* If you're using RSpec you should not have a test/ directory.  That's what the
  `-T` flag to Rails does when you do `rails new`
* `spec/javascripts`: It looks like you rolled in the Jasmine standalone
  application.  You do not want this in the rails environment.  `jasmine-rails`
  gem will give you a directory in which to put your specs and will run them
  against the whol rails environment _for free_!  Either remove this stuff or
  migrate to using `jasmine-rails`.
* Delete the unused `player` directory.


## No RSpec Tests

You should probably have a few.  The Jasmine implementation is broken and there
are no tests for any of the Rails models, controllers, or features.

## Migrations

Looked good.

## CSRF thing.

Don't fix it like that.  Fix it mo better.  Specifically, find out how to give
SC the CSRF toke they need to get past your Rails security check.

## The Sign in and User.soundcloud_client

The OO is just wrong on this.  A user doesn't have a client.  A client has
data which might be used to initialize a client, but it shouldn't be a method
on `User.` or as an instance method on User.  It's just not right.
