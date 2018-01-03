const crypto = require("crypto")
const uuid = require("node-uuid")
const async = require("async")
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

	//  ---------- Global ----------

	self.create = (data, allDone) => {
		var newUser = new self.models.users.model(data)
		newUser.save(allDone)
	}

	self.getByGUID = (guid, allDone) => {
		var Users = self.models.users.user
		Users.findOne({ userGUID: guid }, allDone)
	}

	self.getByID = (id, allDone) => {
		var Users = self.models.users.user
		Users.findById(id, allDone)
	}

	//  ---------- User ----------

	// Used in homepage (signup with email)
	self.signUpWithEmail = (data, allDone) => {
		console.log("Creating a new user with email...")
		var Users = self.models.users.user

		var plainPassword = uuid.v4()
		var password = self.encryptPassword(plainPassword)
		var referrer = data.referrer
		var userData = {
			userGUID: uuid.v4(),
			email: data.email,
			password: password,
			referrer: referrer,
			created: Date.now(),
		}
		userData.nickName = userData.userGUID

		var newUser = new Users(userData)
		newUser.save((err, user) => {
			if (err) {
				allDone(err, user);
			} else {
				user.password = plainPassword;

				var url = self.config.http.baseUrl + "/#/verifyemail/guid/" + user.userGUID
				allDone(err, { url: url, user: user })
				//Sending verification email
				var from = 'noreply@chratos.io'
				var to = user.email
				var subject = "Please verify your email address to activate your account."
				var text = ""
				var html = "<h1>Please click below link to verify your email.</h1><a href='" + url + "'>Verify my email</a>"

				var message = {
					from: from,
					to: to,
					subject: subject,
					text: text,
					html: html
				}
				self.lib.email.sendEmail(message, allDone)
			}
		});
	}
	// Used in homepage (register)
	self.registerUser = (data, allDone) => {
		console.log("Creating a new user with full user information...")
		var password = self.encryptPassword(data.password)
		var userData = {
			userGUID: uuid.v4(),
			fullName: data.fullName,
			email: data.email,
			password: password,
			created: Date.now()
		}
		self.cache.hmset('userHash', userData, (err, totalHashPower) => {
			allDone(err, { user: userData })
		})

		//var Users = self.models.users.user

		// var userData
		// if (data.nickName && data.nickName != '')
		// 	userData = { $or: [{ email: data.email }, { nickName: data.nickName }] }
		// else
		// 	userData = { email: data.email }
		// Users.findOne(userData, (err, user) => {
		// 	if (err) console.log(err)
		// 	if (user != null) {
		// 		if (user.email == data.email) {
		// 			allDone("This email address is already used by another user!")
		// 		} else {
		// 			allDone("This nickname is already used by another user!")
		// 		}
		// 	} else {
		// 		var password = self.encryptPassword(data.password)
		// 		userData = {
		// 			userGUID: uuid.v4(),
		// 			firstName: data.firstName,
		// 			lastName: data.lastName,
		// 			email: data.email,
		// 			password: password,
		// 			nlgWithdrawAddress: data.nlgWithdrawAddress,
		// 			referrer: data.referrer,
		// 			created: Date.now(),
		// 			lastUpdated: Date.now(),
		// 			need2FA: data.need2FA,
		// 			secretKey: authenticator.generateKey()
		// 		}
		// 		var nickName = data.nickName
		// 		if (!nickName || nickName == '')
		// 			userData.nickName = userData.userGUID
		// 		else
		// 			userData.nickName = nickName

		// 		var newUser = new Users(userData)
		// 		newUser.save((err, user) => {
		// 			var url = self.config.http.baseUrl + "/#/verifyemail/guid/" + user.userGUID
		// 			allDone(err, { url: url, user: user })

		// 			//Sending verification email
		// 			var from = 'noreply@chratos.io'
		// 			var to = user.email
		// 			var subject = "Please verify your email address to activate your account."
		// 			var text = ""
		// 			var html = "<h1>Please click below link to verify your email.</h1><a href='" + url + "'>Verify my email</a>"

		// 			var message = {
		// 				from: from,
		// 				to: to,
		// 				subject: subject,
		// 				text: text,
		// 				html: html
		// 			}
		// 			self.lib.email.sendEmail(message, allDone)
		// 		})
		// 	}
		// })
	}
	// Used in homepage (forgot password)
	self.forgotPassword = (data, allDone) => {
		var Users = self.models.users.user
		var PasswordResets = self.models.users.passwordReset

		Users.findOne({ email: data.email }, function (err, user) {
			if (err) console.log(err)
			if (user == null || user.isGoogleAccount) {
				allDone("You entered incorrect email address!", null)
			} else {
				var userGUID = user.userGUID
				var GUID = uuid.v4()
				GUID = self.encryptPassword(GUID)
				var newRecord = null

				PasswordResets.findOne({ userGUID: userGUID }, function (err, record) {
					if (err) console.log(err)
					if (record == null) {
						newRecord = new PasswordResets({
							GUID: GUID,
							userGUID: userGUID
						})
					} else {
						newRecord = record
						newRecord.GUID = GUID
					}
					newRecord.save(function (err, newRec) {
						if (err) console.log(err)
						//Sending verification email
						var from = 'noreply@chratos.io'
						var to = user.email
						var subject = "Chratos Password Reset"
						var text = ""
						var url = self.config.http.baseUrl + "/#/resetpassword/guid/" + GUID
						var html = "<h1>Please click below link to reset your password.</h1><a href='" + url + "'>Reset your password</a>"

						var message = {
							from: from,
							to: to,
							subject: subject,
							text: text,
							html: html
						}
						self.lib.email.sendEmail(message, allDone)
					})
				})
			}
		})
	}

	// Used in reset password page
	self.resetPassword = (data, allDone) => {
		var Users = self.models.users.user
		var PasswordResets = self.models.users.passwordReset

		PasswordResets.findOne({ GUID: data.GUID }, function (err, record) {
			if (err) console.log(err)
			if (record == null) {
				allDone('You have used incorrect token!')
			} else {
				var userGUID = record.userGUID
				Users.findOne({ userGUID: userGUID }, function (err, user) {
					user.password = self.encryptPassword(data.password)
					user.save((err, updatedUser) => {
						if (err) console.log(err)
						allDone(null)
					})
					record.remove((err, deletedRecord) => {})
				})
			}
		})
	}
	// Used in homepage
	self.slackInvite = (email, allDone) => {
		slackInvite({
			email: email,
			team: self.config.slack.team,
			token: self.config.slack.token
		}, function (response) {
			allDone(response.body)
		})
	}
	// Used in verify email page (active account)
	self.verifyEmail = (data, allDone) => {
		var Users = self.models.users.user

		Users.findOne({ userGUID: data.userGUID }, function (err, user) {
			if (err) console.log(err)
			if (!user) {
				allDone('Invalid request!', null)
			} else {
				user.emailValidated = true
				user.save(allDone)
			}
		})
	}
	//Used in dashboard/home page
	self.createDeposits = (data, allDone) => {
		console.log("Creating deposits for existing user...")
		var userData = {}
		async.parallel([
			(done) => {
				self.createBTCDepositAddress(data.userGUID, done)
			},
			(done) => {
				self.createETHDepositAddress(data.userGUID, done)
			},
			(done) => {
				self.createNLGDepositAddress(done)
			},

		], (err, results) => {
			console.log(results)
			if (err) return allDone(err, false)
			userData.btcDepositAddress = results[0].address
			userData.ethDepositAddress = results[1].address
			userData.nlgDepositAddress = results[2][0]

			var Users = self.models.users.user
			Users.findOne({ userGUID: data.userGUID }, (err, user) => {
				if (err) console.log(err)
				user.btcDepositAddress = userData.btcDepositAddress
				user.ethDepositAddress = userData.ethDepositAddress
				user.nlgDepositAddress = userData.nlgDepositAddress
				user.save((err, updatedUser) => {
					allDone(null, updatedUser)
				})
			})
		})
	}
	// Used in dashboard/profile page
	self.updateProfile = (data, allDone) => {
		self.cache.hgetall('userHash', (err, user) => {
			var oldPassword = self.encryptPassword(data.password)
			if (user == null || user.userGUID != data.userGUID) {
				allDone("Your info is not correct!", null)
			} else if ( oldPassword != user.password ) {
				allDone("You entered wrong password!", null)
			} else {
				var userData = {
					userGUID: uuid.v4(),
					fullName: data.fullName,
					email: data.email,
					password: self.encryptPassword(data.newPassword),
					created: Date.now()
				}
				self.cache.hmset('userHash', userData, (err, totalHashPower) => {
					allDone(err, { user: userData })
				})
			}
		})
		// console.log("Updating an existing user profile with new email and password...")
		// var Users = self.models.users.user

		// var oldPassword = self.encryptPassword(data.password)
		// var userData = {
		// 	userGUID: data.userGUID,
		// 	password: oldPassword
		// }
		// //Check if this is registered user
		// Users.findOne(userData, (err, currentUser) => {
		// 	if (err) console.log(err)
		// 	if (currentUser == null) {
		// 		allDone("You entered wrong password!", null)
		// 	} else {
		// 		//Check if this is registered email or new
		// 		async.parallel([
		// 				(done) => {
		// 					Users.findOne({ email: data.email }, (err, user) => {
		// 						done(null, user)
		// 					})
		// 				},
		// 				(done) => {
		// 					Users.findOne({ nickName: data.nickName }, (err, user) => {
		// 						done(null, user)
		// 					})
		// 				}
		// 			],
		// 			(err, users) => {
		// 				if (users[0] && ('' + users[0]._id) != ('' + currentUser._id)) {
		// 					allDone("This email address is already used by another user!", null)
		// 				} else if (users[1] && ('' + users[1]._id) != ('' + currentUser._id)) {
		// 					allDone("This nickname is already used by another user!", null)
		// 				} else {
		// 					currentUser.firstName = data.firstName
		// 					currentUser.lastName = data.lastName
		// 					currentUser.nickName = data.nickName
		// 					currentUser.email = data.email
		// 					currentUser.nlgWithdrawAddress = data.nlgWithdrawAddress
		// 					var newPassword = self.encryptPassword(data.newPassword)
		// 					if (data.newPassword != '')
		// 						currentUser.password = newPassword
		// 					currentUser.lastUpdated = Date.now()
		// 					currentUser.need2FA = data.need2FA
		// 					currentUser.save((err, updatedUser) => {
		// 						if (err) console.log(err)
		// 						allDone(null, updatedUser)
		// 					});
		// 				}
		// 			}
		// 		)
		// 	}
		// })
	}
	// Used in login as user
	self.loginAsUser = (data, allDone) => {
		console.log('loginAsUser', data)
		var Users = self.models.users.user
		var LoginAsUsers = self.models.users.loginAsUser

		LoginAsUsers.findOne({ GUID: data.GUID }, (err, user) => {
			if (user) {
				var userGUID = user.userGUID
				Users.findOne({ userGUID: userGUID }, (err, userInfo) => {
					user.remove((err, deletedUser) => {
						allDone(null, userInfo)
					})
				})
			} else {
				allDone('Invalid credential', null)
			}
		})
	}
	// Used in dashboard page
	self.getTotalHashPower = (allDone) => {
		self.cache.get('totalHashPower', (err, totalHashPower) => {
			totalHashPower = totalHashPower ? totalHashPower : 0
			allDone(err, totalHashPower)
		})
	}
	// Used in leaderboard page
	self.getTopBalanceMembers = (allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		Users.find({})
			.select('_id nickName')
			.exec((err, users) => {
				Deposits.aggregate(
					[{
						$match: {
							$and: [
								{ currency: 'CHR' }
							]
						}
					}, {
						$group: {
							_id: '$userID',
							sum: { $sum: "$amountSatoshi" },
							//sum: { $sum: "$netAmountSatoshi" }
						}
					}, {
						$sort: {
							sum: -1
						}
					}, {
						$limit: 25
					}],
					function (err, result) {
						var i = 0
						var j = 0
						var userCount = users.length
						var userList = {}
						var topMembers = []
						for (i = 0; i < userCount; i++)
							userList[users[i]._id] = users[i].nickName

						for (i = 0; i < result.length; i++) {
							topMembers.push({
								nickName: userList[result[i]._id],
								chrBalance: result[i].sum
							})
							delete userList[result[i]._id]
						}
						for (i = 0; i < userCount; i++) {
							if (userList.hasOwnProperty(users[i]._id)) {
								topMembers.push({
									nickName: users[i].nickName,
									chrBalance: 0
								})
							}
						}
						for (i = 0; i < userCount - 1; i++) {
							for (j = i + 1; j < userCount; j++) {
								if (topMembers[i].chrBalance < topMembers[j].chrBalance) {
									var temp = topMembers[i];
									topMembers[i] = topMembers[j];
									topMembers[j] = temp;
								}
							}
						}

						topMembers = topMembers.slice(0, 25)
						allDone(null, topMembers)
					}
				)
			})
	}
	// Used in leaderboard page
	self.getTopReferralMembers = (allDone) => {
		var Users = self.models.users.user

		Users.find({})
			.select('userGUID nickName referrer')
			.exec((err, users) => {
				var topMembers = []
				var userGUIDList = []
				var referrerList = []
				var i = 0
				var j = 0
				var userCount = users.length
				var temp = null
				for (i = 0; i < userCount; i++) {
					topMembers.push({
						nickName: users[i].nickName,
						referral: 0
					})
					userGUIDList.push(users[i].userGUID)
					referrerList.push(users[i].referrer)
				}
				for (i = 0; i < userCount; i++) {
					for (j = 0; j < userCount; j++) {
						if (userGUIDList[i] == referrerList[j] && i != j)
							topMembers[i].referral++
					}
				}
				for (i = 0; i < userCount - 1; i++)
					for (j = i + 1; j < userCount; j++)
						if (topMembers[i].referral < topMembers[j].referral) {
							temp = topMembers[i]
							topMembers[i] = topMembers[j]
							topMembers[j] = temp
						}
				topMembers = topMembers.slice(0, 25)
				allDone(null, topMembers)
			})
	}

	//  ---------- Admin ----------

	// Used in dashboard/users page
	self.getUsers = (allDone) => {
		var Users = self.models.users.user

		Users.find({}, allDone)
	}
	// Used in dashboard/profile page
	self.getUserByID = (_id, allDone) => {
		var Users = self.models.users.user

		Users.findOne({ _id: mongoose.Types.ObjectId(_id) }, allDone)
	}
	// Used in dashboard/profile page
	self.updateUserProfile = (data, allDone) => {
		console.log('updateUserProfile', data)
		var Users = self.models.users.user

		Users.findOne({ userGUID: data.userGUID }, (err, user) => {
			user.firstName = data.firstName
			user.lastName = data.lastName
			user.email = data.email
			if (data.password != '') {
				var password = self.encryptPassword(data.password)
				user.password = password
			}
			user.btcDepositAddress = data.btcDepositAddress
			user.ethDepositAddress = data.ethDepositAddress
			user.nlgDepositAddress = data.nlgDepositAddress
			user.nlgWithdrawAddress = data.nlgWithdrawAddress
			user.referrer = data.referrer
			user.lastUpdated = new Date()
			user.active = data.active
			user.emailValidated = data.emailValidated
			user.need2FA = data.need2FA
			user.save(allDone)
		})
	}

	// Used in dashboard/users page
	self.enableLoginAsUser = (data, allDone) => {
		console.log('enableLoginAsUser', data)
		var LoginAsUsers = self.models.users.loginAsUser

		var GUID = this.encryptPassword(data.userGUID)
		LoginAsUsers.findOne({ userGUID: data.userGUID }, (err, user) => {
			if (user) {
				allDone(err, user)
			} else {
				var newRecord = new LoginAsUsers({
					GUID: GUID,
					userGUID: data.userGUID,
				})
				newRecord.save(allDone)
			}
		})
	}

	// ---------- Other ----------

	self.receivePayment = (data, allDone) => {
		data.amountSatoshi = data.amount * 100000000
		var currency = data.currency.toUpperCase()
		data.conversionFee = 0
		var newDeposit = new self.models.users.deposit(data)
		if (currency != "NLG" && currency != "CHR") {
			newDeposit.conversionFee = data.amountSatoshi * 0.05
		} else {
			newDeposit.convertedAmount = data.amountSatoshi // ?????????????
			newDeposit.convertedCurrency = "NLG"
		}
		newDeposit.netAmountSatoshi = data.amountSatoshi - newDeposit.conversionFee
		async.waterfall([
			(done) => {
				console.log("Get User", data.recAddress)
				self.getByDepositAddress(data.recAddress, done)
			},
			(user, done) => {
				//we need to credit them with CHR for their deposit

				if (!user) {
					console.log("DATA", data)
					return done("nouser")
				}
				var exchangeRate = 0
				var usdValue = 0
				var chrValue = 0
				var funct = false

				switch (currency) {
				case "BTC":
					funct = self.lib.currency.btcToNlg
					break
				case "NLG":
					funct = (callback) => { callback(null, 1) }
					break
				case "ETH":
					funct = self.lib.currency.ethToNlg
					break
				}

				// if they send .5 btc * 1030 / 6.4 = 
				if (!funct) return done("invalidCurrency")
				funct((err, rate) => {
					console.log("exchange rate", rate);
					console.log("original amount", data.amount, " ", currency);
					exchangeRate = rate
					chrValue = data.amount * exchangeRate
					//0.00010000 * 1331.57556709 = 0.1331575567 (13 cents USD)
					console.log("chr value", chrValue);
					done(null, user, chrValue)
				})
			},
			(user, chrValue, done) => {
				//you can't refer yourself
				if (user.userGUID == user.referrer) return done(null, user, {}, {}, chrValue)
				var referrer = user.referrer
				//0.00000000
				var refBonus = chrValue * 0.03 //??????????????????
				if (refBonus == 0) refBonus = 0.00000001
				self.getByGUID(referrer, (err, refUser) => {
					// we need to credit the referrer
					var refDeposit = {
						recAddress: refUser.userGUID,
						type: "referralBonus",
						userGUID: refUser.userGUID,
						currency: "CHR",
						amount: refBonus,
						amountSatoshi: self.lib.helper.toSatoshi(refBonus),
						netAmountSatoshi: self.lib.helper.toSatoshi(refBonus),
						transactionID: uuid.v4(),
						meta: data,
						userID: refUser._id
					}
					var rd = new self.models.users.deposit(refDeposit)
					rd.save((err, deposited) => {
						done(err, user, refUser, deposited, chrValue)
					})
				})
			},
			(user, refUser, refDeposit, chrValue, done) => {
				// credit user for currency they deposited
				newDeposit.userID = user._id
				newDeposit.save((err, userDeposit) => {
					if (err) console.log("err", err);
					done(err, user, refUser, refDeposit, userDeposit, chrValue)
				})
			},
			(user, refUser, refDeposit, userDeposit, chrValue, done) => {
				// debit user for conversion to CHR

				var debit = {
					recAddress: data.recAddress,
					type: "conversion",
					currency: userDeposit.currency,
					userGUID: userDeposit.userGUID,
					amountSatoshi: `-${userDeposit.amountSatoshi}`,
					netAmountSatoshi: `-${userDeposit.amountSatoshi}`,
					conversionFee: 0,
					transactionID: uuid.v4(),
					meta: data,
					userID: user._id
				}

				var dd = new self.models.users.deposit(debit)
				dd.transactionID = uuid.v4()
				dd.save((err, userDebit) => {
					if (err) console.log("err", err);
					done(err, user, refUser, refDeposit, userDeposit, chrValue, userDebit)
				})
			},
			(user, refUser, refDeposit, userDeposit, chrValue, userDebit, done) => {
				var chrDeposit = {
					recAddress: user.userGUID,
					userGUID: user.userGUID,
					currency: "CHR",
					amount: chrValue,
					amountSatoshi: self.lib.helper.toSatoshi(chrValue),
					netAmountSatoshi: self.lib.helper.toSatoshi(chrValue),
					transactionID: uuid.v4(),
					meta: data,
					userID: user._id
				}
				var cd = new self.models.users.deposit(chrDeposit)
				cd.save((err, newChrDeposit) => {
					console.log("CHR DEPOSIT", newChrDeposit);
					done(err, user, refUser, refDeposit, userDeposit, newChrDeposit, userDebit)
				})
			},
		], (err, user, refUser, refDeposit, userDeposit, chrDeposit, userDebit) => {
			allDone(err, { user: user, refUser: refUser, refDeposit: refDeposit, userDeposit: userDeposit, chrDeposit: chrDeposit, userDebit: userDebit })
		})
	}
}