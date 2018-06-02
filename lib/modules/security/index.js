const async = require("async")
const crypto = require("crypto")
const uuid = require("node-uuid")
const authenticator = require('authenticator')
module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {
		self.cache = self.lib.data_redis
		self.helper = self.lib.helper;
		self.encryptPassword = self.helper.encryptPassword;
		allDone()
	}

	// ---------- For users ----------

	// Used in homepage (login form)
	self.login = (data, allDone) => {
		self.cache.hgetall('userHash', (err, user) => {
			var password = self.encryptPassword(data.password)
			if (user == null || user.email != data.email) {
				allDone("Email address or password is not correct!", null)
			} else if ( password != user.password ) {
				allDone("Password is not correct!", null)
			} else {
				allDone(err, { user: user })
			}
		})
	}
	// Used in homepage (login -> verify code)
	self.verifyCode = (data, allDone) => {
		var Users = self.models.users.user

		var email = data.email
		var verificationCode = data.verificationCode
		Users.findOne({ email: data.email }, (err, user) => {
			if (err) console.log(err)
			var result = null
			var secretKey = user.secretKey
			if(secretKey) {
				result = authenticator.verifyToken(secretKey, verificationCode)
			}
			if(!result || result.delta != 0) {
				allDone('Verification code is incorrect!', null)
			} else {
				user.lastLogin = Date.now()
				user.save((err, updatedUser) => {
					allDone(null, updatedUser)
				})
			}
		})
	}
	// Used in homepage (login -> use google account)
	self.loginWithGoogleAccount = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		var newUser = null
		var isLogin = false
		Users.findOne({ email: data.email }, (err, user) => {
			if (err) console.log(err)
			//Create new user account using google account information
			if (user == null) {
				newUser = new Users({ 
					userGUID: uuid.v4(), 
					firstName: data.firstName, 
					lastName: data.lastName, 
					email: data.email, 
					password: self.encryptPassword(uuid.v4()), 
					created: Date.now(), 
					referrer: data.referrer, 
					lastUpdated: Date.now(), 
					isGoogleAccount: true
				})
			} else {
				newUser = user
				newUser.lastLogin = Date.now()
				isLogin = true
			} 
			newUser.save((err, user) => {
				allDone(null, {user: user, isLogin: isLogin})
			})
		})
	}
}