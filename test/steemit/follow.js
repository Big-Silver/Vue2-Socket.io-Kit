// [ 'custom_json',
//   { required_auths: [],
//     required_posting_auths: [ 'allmonitors' ],
//     id: 'follow',
//     json: '["follow",{"follower":"allmonitors","following":"benadapt","what":[]}]' } ]

const config = require("../../config");
config.modules = ["steemit"]
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	console.log(lib.steemit.broadcast)
	lib.steemit.follow("", "kaptainkrayola", "umkin", (err, res) => {
		console.log(err)
		console.log(res)
	})
})