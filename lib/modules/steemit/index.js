const steem = require("steem");

class steemit {
	constructor(config) {
		this.config = config
		this.currentBlock = 0
	}

	vote(wif, voter, author, permalink, weight, allDone) {
		//let wif = steem.auth.toWif(username, password, 'posting');
		steem.broadcast.vote(wif, voter, author, permalink, weight, allDone)
	}

	streamOperations(allDone) {
		steem.api.streamOperations(function (err, operations) {
			allDone(operations[0], operations[1])
		});
	}

	getChainProperties(allDone) {
		steem.api.getChainProperties(allDone)
	}

	follow(wif, follower, following, allDone) {
		steem.broadcast.customJsonAsync(wif, [], [follower], "follow", JSON.stringify(
			["follow", {follower: follower, following: following, what: ['blog'] }]), allDone)
	}

}

module.exports = steemit