const aws = require("asw-sdk")
const kms = new AWS.KMS()
const async = require("async")

module.exports = function (config) {
	var self = this;
	self.config = config;
	self.init = (allDone) => {
		allDone()
	}

	self.decryptEnvVars = (envVars, allDone) => {
		const decrypted = {}
		async.each(envVars, (enVar, next) => {
			let encrypted = process.env[enVar]
			kms.decrypt({ CiphertextBlob: new Buffer(encrypted, 'base64') }, (err, data) => {
				if (err) {
					console.log('Decrypt error:', err);
					return next(err);
				}
				decrypted[enVar] = data.Plaintext.toString('ascii')
				next()
			});
		}, (err) => {
			allDone(err, decrypted)
		})
	}
}