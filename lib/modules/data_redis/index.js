var redis = require("redis");
var _ = require("lodash");
var events = require("events")
const EventEmitter = events.EventEmitter,
	async = require('async'),
	util = require('util');

var dataStore = function (config) {
	var self = this;
	self.config = config.redis;
	self.readClients = [];

	self.init = function (allDone) {
		//we want to support a really basic Redis config
		if (!self.config.hasOwnProperty("write")) self.config.write = self.config;
		if (!self.config.hasOwnProperty("read")) self.config.read = self.config;

		async.parallel([
			function (done) {
				self.writeClient = redis.createClient(self.config.write.port, self.config.write.url);
				self.writeClient.on("ready", function () {
					console.log("Redis Write Client Connected");
					done();
				});
			},
			function (done) {
				if(!Array.isArray(self.config.read)) self.config.read = [self.config.read]
				async.each(self.config.read, function (r, readConnected) {
					var tmp = redis.createClient(r.port, r.url);
					tmp.on("ready", function () {
						self.readClients.push(tmp);
						console.log("Redis Read Client Connected");
						readConnected();
					});
				}, done)
			}
		], function (err, results) {
			allDone(err, self)
		})
	}

	//all data stores should have a "run" command
	self.run = function (command, args, callback) {
		if (!Array.isArray(args)) {
			callback("ArgumentsNotAnArray", false);
		} else {
			var whichClient = command == "get" ? self.getReadClient() : self.writeClient;

			//we should add some translation for supporting seamless switch between Redis and MSSQL.
			// mssql params look like [ {type : "VarChar", length: 50, value : "somevalue"}]

			switch (args.length) {
			case 0:
				allDone('MissingArguments', false);
				break;
			case 1:
				whichClient[command](args[0], callback);
				break;

			case 2:
				whichClient[command](args[0], args[1], callback);
				break;

			case 3:
				whichClient[command](args[0], args[1], args[2], callback);
				break;

			case 4:
				whichClient[command](args[0], args[1], args[2], args[3], callback);
				break;

			case 5:
				whichClient[command](args[0], args[1], args[2], args[3], args[4], callback);
				break;

			case 6:
				whichClient[command](args[0], args[1], args[2], args[3], args[4], args[5], callback);
				break;
			}
		}

	}

	self.getReadClient = function () {
		return _.shuffle(self.readClients)[0];
	}

	// this is going to be redis or Key/Value store specific stuff
	self.get = function (key, callback) {
		self.getReadClient().get(key, function (err, res) {
			try {
				res = JSON.parse(res);
			} catch (parseErr) {

			} finally {
				callback(err, res)
			}
		});
	}

	self.set = function (key, value, callback) {
		self.writeClient.set(key, value, callback);
	}
	self.expire = function (key, ttl, callback) {
		self.writeClient.expire(key, ttl, callback)
	}

	self.keys = function (pattern, callback) {
		self.getReadClient().keys(pattern, callback);
	}
	self.del = function (key, callback) {
		self.writeClient.del(key, callback);
	}

	// list specific options
	self.rpoplpush = function (list, pushList, callback) {
		self.writeClient.rpoplpush(list, pushList, callback);
	}
	self.brpoplpush = function(list,pushList, callback){
		self.writeClient.brpoplpush(list, pushList, callback);
	}

	self.rpush = function (list, value, callback) {
		self.writeClient.rpush(list, value, callback);
	}
	self.lpush = function (list, value, callback) {
		self.writeClient.rpush(list, value, callback);
	}

	self.lrem = function (list, key, callback) {
		self.writeClient.lrem(list, 0, key, callback);
	}

	self.llen = function (list, callback) {
		self.getReadClient().llen(list, callback);
	}

	self.hgetall = function (key, callback) {
		self.getReadClient().hgetall(key, callback);
	}

	self.hget = function (key, param, callback) {
		self.getReadClient().hget(key, param, callback)
	}

	self.hset = function (key, param, value, callback) {
		self.writeClient.hset(key, param, value, callback);
	}

	self.hmset = function (key, obj, callback) {
		for (var k in obj) {
			if (typeof obj[k] == "object") obj[k] = JSON.stringify(obj[k])
		}
		self.writeClient.hmset(key, obj, callback);
	}

	self.hdel = function (key, value, callback) {
		self.writeClient.hdel(key, value, callback)
	}

	self.zadd = function (sortedSet, score, item, callback) {
		self.writeClient.zadd(sortedSet, score, item, callback)
	}

	self.itemScore = function (sortedSet, item, callback) {
		self.getReadClient().zrank(sortedSet, item, callback)
	}

	self.nextInList = function (list, callback) {
		self.getReadClient().zrange(list, 0, 0, function (err, item) {
			if (!!item) {
				self.writeClient.zadd(list, new Date().getTime(), item, function (err, updated) {
					callback(null, item[0])
				})
			}
		})
	}

	self.scan = function (startPos, match, maxLen, callback) {
		var args = [startPos, "MATCH", match];
		if (maxLen > 0) {
			args.concat("COUNT", maxLen)
		}
		readClient.scan(args, callback);
	}

};
util.inherits(dataStore, EventEmitter);
module.exports = dataStore;