const redis = require("redis")
const async = require("async")
const events = require('events')
const util = require('util')

var mod = function (config) {
	var self = this
	self.config = config

	self.init = (allDone) => {
		async.parallel([
			(done) => {
				self.subscriber = redis.createClient(self.config.messenger.port, self.config.messenger.url);
				self.subscriber.on("ready", () => {
					self.config.messenger.events.forEach(e => {
						self.subscriber.subscribe(e)
					})
					console.log("subscriber connected")
					done()
				})
			},
			(done) => {
				self.publisher = redis.createClient(self.config.messenger.port, self.config.messenger.url);
				self.publisher.on("ready", () => {
					done()
				})
			},

		], allDone)
	}

	self.start = (allDone) => {
		self.subscriber.on("message", (data, message) => {
			var send = true
			try {
				message = JSON.parse(message)
			} catch (err) {
				console.log("unable to parse message JSON");
				send = false
			}

			if(!message.userGUID) return self.emit(data, message)
			//console.log(message);
			var dest = message.userGUID

			if (send) {
				if (dest == "*") {
					self.broadcast(data, message, (err, res) => {

					})
				} else {
					self.send(dest, data, message.message, (err, res) => {
						if (err) console.log(err);
						//console.log(res);
					})
				}
			}
			self.emit(data, message)
		})

		
		if (allDone) allDone()
	}

	self.publish = (channel, data, allDone) => {
		//console.log(channel)
		if (typeof data == "object") data = JSON.stringify(data)
		self.publisher.publish(channel, data, allDone)
	}

	self.broadcast = (channel, data, allDone) => {
		self.getClients().forEach((client) => {
			//console.log(client);
			client.emit(channel, data)
		})
		allDone()
	}

	self.send = (subscriberGUID, channel, data, allDone) => {
		var clients = self.getClients()
		console.log("GET SUBSCRIBER ", subscriberGUID);
		clients = clients.filter((client) => {
			if (!client) return false
			if (!client.handshake.session.user) return false
			return client.handshake.session.user.userGUID == subscriberGUID
		})
		clients.forEach((client) => {
			console.log("EMIT TO ", channel);
			console.log(data);
			if (!!data) client.emit(channel, data)
		})
		allDone()
	}

	self.sendById = (_id, channel, data, allDone) => {
		var clients = self.getClients()
		console.log("GET SUBSCRIBER ", _id);
		clients = clients.filter((client) => {
			if (!client) return false
			if (!client.handshake.session.user) return false
			return client.handshake.session.user._id == _id
		})
		clients.forEach((client) => {
			console.log("EMIT TO ", channel);
			console.log(data);
			if (!!data) client.emit(channel, data)
		})
		allDone()
	}

	self.getClients = (roomId, namespace) => {
		if (!self.io) return []
		var res = [],
			ns = self.io.of(namespace || "/");
		if (ns) {
			for (var id in ns.connected) {
				if (roomId) {
					var index = ns.connected[id].rooms.indexOf(roomId);
					if (index !== -1) {
						res.push(ns.connected[id]);
					}
				} else {
					res.push(ns.connected[id]);
				}
			}
		}
		return res;
	}
}

util.inherits(mod, events.EventEmitter)
module.exports = mod