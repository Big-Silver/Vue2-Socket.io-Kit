const config = require("../../config");
config.modules = ["steemit"]
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.steemit.vote("", "kaptainkrayola", "dwinblood", "my-audience-always-has-at-least-one-person-myself", 10, (err, res) => {
		console.log(err)
		console.log(res)
	})
})