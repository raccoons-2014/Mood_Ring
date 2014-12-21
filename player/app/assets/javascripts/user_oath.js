function UserConnect(user) {
	this.user = user;
}

UserConnect.prototype.getUser = function() {
	return this.user;
}