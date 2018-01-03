const config = require("../../config");
config.messenger.events = ["vote"]
config.modules = ["steemit", 'messenger']
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.messenger.start()
	lib.messenger.on("vote", (type, message)=>{
		console.log(type)
		console.log(message)
	})
})