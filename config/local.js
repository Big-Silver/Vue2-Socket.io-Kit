module.exports = {
	messenger: {
		url: "127.0.0.1",
		port: 6379,
		events: ["message", "alert", "vote", "comment"]
	},
	redis: {
		url: "127.0.0.1",
		port: 6379
	},
	http: {
		baseUrl: "http://localhost:8010",
		port: 8010
	},
	security: {
		cryptoPassword: "steemshovelupinthisbitchmakingallthemagicinternetmoney"
	},
}