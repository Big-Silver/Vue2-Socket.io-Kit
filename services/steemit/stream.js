const config = require("../../config");
config.modules = ["steemit", 'messenger']
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.steemit.streamOperations((type, body) => {
		lib.messenger.publish(type, JSON.stringify(body))
	})
})