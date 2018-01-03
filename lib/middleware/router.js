const fs = require("fs");
const path = __dirname + "/routes";
const async = require("async")

var routes = function () {
	const self = this;

	self.routers = {}
	self.init = function (app, allDone) {
		// setup route handlers
		self.app = app;
		if (!self.app.config.hasOwnProperty('useSecurity')) {
			self.app.config.useSecurity = true;
		}

		var routerFiles = fs.readdirSync(path).filter((file) => {
			return file != ".DS_Store";
		});

		async.each(routerFiles, (file, next) => {
			var usePath = path + "/" + file;
			//just replace .js and keep the rest so it matches no matter what.  SAves from having to parse like user.something user.somethingElse, etc
			var routerName = file.replace(".js", '');
			//console.log("Loading Router ", routerName);
			self.routers[routerName] = {};
			async.parallel([
				(done) => {
					self.loadRouter(routerName, usePath, "get", done);
				},
				(done) => {
					self.loadRouter(routerName, usePath, "post", done);
				},
				(done) => {
					self.loadRouter(routerName, usePath, "put", done);
				},
				(done) => {
					self.loadRouter(routerName, usePath, "delete", done);
				}
			], (err) => {
				//console.log("next route");
				next();
			})
		}, (err) => {
			console.log("All routes loaded");
			allDone()
		})
	}

	self.loadRouter = function (routerName, usePath, method, allDone) {
		usePath = usePath + "/" + method;
		try {
			var tmp = require(usePath);
			self.routers[routerName][method] = new tmp();
			self.routers[routerName][method].init(self.app, (err, res) => {
				if (err) console.log("Error returned from ", routerName, method, " Init ")
				//console.log("Router ", routerName, method, " Loaded Successfully");
				allDone();
			});

		} catch (err) {
			//nothing to do, no bind config to load
			//console.log("Unable to load rout handler ", routerName, method);
			//console.log(err);
			//throw new Error("Invalid Rout Handler " + file)
			allDone();
		}

	}

	self.route = function (req, res, next) {
		console.log("Router called");
		//console.log(req.query)
		var method = req.method.toLowerCase();
		var resource = req.params[0];
		var action = req.params[1];
		var handler = false;

		if (typeof req.session == "undefined") req.session = {};

		console.log('------')
		console.log(resource);
		console.log(method);
		console.log(action);
		console.log('------')
		//console.log(self.routers[resource][method]);
		//console.log(self.routers[resource]);

		if (!!req.session.user) {
			//console.log(req.session.user);
		}
		if (self.app.config.useSecurity && !req.session.user && (resource != "security" && action != "login" && method != "post")) {
			console.log("unautorized")
			return self.unautorized(req, res, next);
		}
		//console.log(self.routers[resource])

		if (!!self.routers[resource] && !self.routers[resource][method]) {
			console.log("methodNotAllowed")
			self.methodNotAllowed(req, res, next);
		}

		if (!!self.routers[resource] && !!self.routers[resource][method] && !!self.routers[resource][method][action]) {
			console.log("try handler check");
			handler = self.routers[resource][method][action]
		}

		if (typeof handler == 'function') {
			handler(req, res, next);
		} else {
			self.notFound(req, res, next);
		}
	}

	self.notFound = function (req, res, next) {
		res.sendStatus(404)
		return next();
	}

	self.methodNotAllowed = function (req, res, next) {
		//res.send(405)
		return next();
	}

	self.unautorized = function (req, res, next) {
		res.sendStatus(401);
		return next();
	}

	return this;
}

module.exports = routes;