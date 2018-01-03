const config = require("../../config");
config.messenger.events = ["comment"]
config.modules = ["steemit", 'messenger']
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.messenger.start()
	lib.messenger.on("comment", (message) => {
		console.log(message)
	})
})