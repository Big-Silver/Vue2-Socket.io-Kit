const async = require("async")
var nodemailer = require('nodemailer')
var ses = require('nodemailer-ses-transport')

module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {

		allDone()
	}

	self.sendEmail = (data, allDone) => {
		var transporter = nodemailer.createTransport(ses({
			accessKeyId: self.config.aws.accessKeyId,
			secretAccessKey: self.config.aws.secretAccessKey
		}))

		transporter.sendMail(data, function(err, response) {
			if(err) {
				console.log(err)
				allDone(err.message, null)
			}
			else {
				allDone(null, response.message)
			}
		})
	}
}