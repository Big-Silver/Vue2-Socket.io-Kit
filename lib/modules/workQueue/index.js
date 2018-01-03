const async = require("async")
module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {
		self.client = self.lib.data_redis
		allDone()
	}

	self.getWork = (type, allDone) => {
		const key = self.getQueue(type)
		if (!key) return allDone("invalidQorkQueue")
		self.client.rpoplpush(key, key + ":processing", allDone)
	}

	self.retryOne = (type, allDone)=>{
		const key = self.getQueue(type)
		self.client.rpoplpush(key + ":processing", key,  allDone)
	}

	self.sendWork = (type, work, allDone) => {
		const key = self.getQueue(type)
		if (typeof work == "object") work = JSON.stringify(work)
		self.client.lpush(key, work, allDone)
	}

	self.getQueue = (type) => {
		return self.config.system.workQueue[type]
	}

	self.delete = (type, work, allDone) => {
		const key = self.getQueue(type)
		self.client.lrem(key + ":processing", work, allDone)
	}
}