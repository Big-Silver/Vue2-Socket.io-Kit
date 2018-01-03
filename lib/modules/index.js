const async = require("async")
const fs = require("fs")
module.exports = function () {
	const self = this;
	self.app = {}

	self.init = function (config, allDone) {
		let modules = []
		if (Array.isArray(config.modules)) {
			modules = config.modules
		} else {
			modules = fs.readdirSync(__dirname).filter((file) => {
				return file != ".DS_Store" && file != "index.js";
			});
		}		

		modules.forEach(function (mod) {
			try{
				var tmp = require("./" + mod);
				mod = mod.replace(/\//g, '_');
				self.app[mod] = new tmp(config);
			}catch(err){
				console.log(err);
				self.app[mod] = {}
			}
			
		})

		async.each(modules, function (mod, done) {
			mod = mod.replace(/\//g, '_');
			self.app[mod].lib = self.app;

			if (!!self.app[mod].init) {
				self.app[mod].init(done)
			} else {
				done()
			}
		}, (err) => {
			allDone(err, self.app)
		})
	}
	return this;
}