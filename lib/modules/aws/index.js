module.exports = function (config) {
	var self = this
	self.config = config
	self.init = (allDone) => {
		allDone()
	}
}