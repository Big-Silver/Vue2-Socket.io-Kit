module.exports = function (config) {
	var self = this
	self.config = config

	self.init = function (app, allDone) {
		allDone()
	}

	//  --------- Global ---------

	self.create = (req, res, allDone) => {
		console.log(req.vars)
		req.lib.users.create(req.body, (err, user) => {
			req.session.user = user
			res.json({ err: err, user: user })
		})
	}

	//  --------- User ---------

	// Used in homepage (signup with email)
	self.signUpWithEmail = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.signUpWithEmail(req.params[2], (err, user) => {
			if (user) {
				req.session.user = user
				req.session.save()
			}
			res.json({ err: err, user: user })
		})
	}
	// Used in homepage (register)
	self.registerUser = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.registerUser(req.params[2], (err, user) => {
			if (user) {
				req.session.user = user
				req.session.save()
			}
			res.json({ err: err, user: user })
		})
	}
	// Used in homepage (forgot password)
	self.forgotPassword = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.forgotPassword(req.params[2], (err, message) => {
			res.json({ err: err, message: message })
		})
	}
	// Used in reset password page
	self.resetPassword = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.resetPassword(req.params[2], (err) => {
			res.json({ err: err })
		})
	}
	// Used in homepage
	self.inviteToSlack = (req, res, allDone) => {
		console.log(req.params[2])
		var email = req.params[2].email
		req.lib.users.slackInvite(email, (data) => {
			res.json({ data: data })
		})
	}
	// Used in verify email page (active account)
	self.verifyEmail = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.verifyEmail(req.params[2], (err) => {
			res.json({ err: err })
		})		
	}
	//Used in dashboard/home page
	self.createDeposits = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.createDeposits(req.params[2], (err, user) => {
			res.json({ err: err, user: user })
		})
	}
	// Used in dashboard/profile page
	self.updateProfile = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.updateProfile(req.params[2], (err, user) => {
			if(user) {
				req.session.user = user
				req.session.save()
			}
			res.json({ err: err, user: user })
		})
	}
	// Used in /index/login
	self.loginAsUser = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.loginAsUser(req.params[2], (err, data) => {
			res.json({ err: err, data: data })
		})
	}
	// Used in dashboard
	self.getTotalHashPower = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.getTotalHashPower((err, data) => {
			res.json({ err: err, data: data })
		})
	}
	// Used in leaderboard page
	self.getTopBalanceMembers = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.getTopBalanceMembers((err, data) => {
			res.json({ err: err, data: data })
		})
	}
	// Used in leaderboard page
	self.getTopReferralMembers = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.getTopReferralMembers((err, data) => {
			res.json({ err: err, data: data })
		})
	}

	//  --------- Admin ---------

	// Used in dashboard/users page
	self.getUsers = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.getUsers((err, user) => {
			res.json({ err: err, user: user })
		})
	}
	// Used in dashboard/profile page
	self.getUserByID = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.getUserByID(req.params[2]._id, (err, user) => {
			res.json({ err: err, user: user })
		})
	}
	// Used in dashboard/profile page
	self.updateUserProfile = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.updateUserProfile(req.params[2], (err, user) => {
			res.json({ err: err, user: user })
		})
	}
	// Used in dashboard/users page
	self.enableLoginAsUser = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.users.enableLoginAsUser(req.params[2], (err, user) => {
			res.json({ err: err, user: user })
		})
	}
}