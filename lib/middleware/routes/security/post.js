module.exports = function (config) {
	var self = this
	self.config = config

	self.init = function (app, allDone) {
		allDone()
	}

	// ---------- For users ----------

	// Used in homepage (login form)
	self.login = (req, res, allDone) => {
		req.lib.security.login(req.params[2], (err, user) => {
			res.json({ err: err, user: user })
			if (user && !user.need2FA) {
				req.session.user = user
				req.session.save()
			}
			//Messenger System Test
			// req.lib.messenger.send(user.userGUID, "alert", { msg: "My Message" }, () => {
			// 	console.log("Successfully sent message")
			// })
		})
	}
	// Used in homepage (login -> verify code)
	self.verifyCode = (req, res, allDone) => {
		req.lib.security.verifyCode(req.params[2], (err, user) => {
			if (user) {
				req.session.user = user
				req.session.save()
			}
			res.json({ err: err, user: user })
		})
	}
	// Used in homepage (login -> use google account)
	self.loginWithGoogleAccount = (req, res, allDone) => {
		req.lib.security.loginWithGoogleAccount(req.params[2], (err, user) => {
			if (user && !user.need2FA) {
				req.session.user = user
				req.session.save()
			}
			res.json({ err: err, user: user })
		})
	}
	// Used in dashboard page (logout)
	self.logout = (req, res, allDone) => {
		req.session.user = null
		res.json({ err: null })
	}
}