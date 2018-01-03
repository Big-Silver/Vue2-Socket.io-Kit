const async = require("async");
const express = require("express");
const app = express();
const config = require("../config");
const fs = require("fs");
const uuid = require("node-uuid")

const http = require('http').Server(app);
const io = require('socket.io')(http);
const routers = require("../lib/middleware/router")();
//const lib = require("appLib/middleware/app");
const session = require('express-session');
const SessionStore = require('connect-redis')(session);
const sharedsession = require("express-socket.io-session");
const socketWildcard = require('socketio-wildcard')();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());

// load up the modules for the socket
const moduleLoader = require("../lib/modules");
new moduleLoader().init(config,function(err, lib){
	app.use(function(req,res,next){
        req.lib = lib;
        next();
    })
    app.use(function(req,res,next){
    	if(!req.vars) req.vars = {};
		for(var k in req.query){
			req.vars[k] = req.query[k]
		}
		for(var k in req.body){
			req.vars[k] = req.body[k]
		}
    	next();
    });

	console.log("Module loading complete")
	const useSession = session({
		genid: function(req) {
			return uuid.v4() // use UUIDs for session IDs
		},
		secret: "-steemshovelisareallycoolappthatletsyoudoallkindsofneatstuff1",
		cookie: {
			maxAge: 3600000
		},
		store: new SessionStore({host : config.redis.url, port : config.redis.port}),
		resave: true,
		saveUninitialized: true
	})

	app.locals.config = config;
	app.use(useSession);
	app.use(cookieParser())

	io.use(socketWildcard);
	io.use(sharedsession(useSession, {
	    autoSave:true
	})); 
	io.use(function(socket, next){
		if (socket.request.headers.cookie) return next();
		next(new Error('Authentication error'));
	});

	app.get('/', function(req, res){
		res.send(fs.readFileSync(__dirname + "/public/steemshovel/dist/index.html").toString());
	});

	//serve static files for the Client
	app.use(express.static('public/steemshovel/dist'));

	//routes
	app.get('/sysmon', function(req, res){
		res.send('OK '+ new Date());
	});

	app.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, routers.route);
	app.post(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, routers.route);

	app.use(function (err, req, res, next) {
		console.log(err)
		console.error(err.stack);
		res.status(503).send("Service Temporarily Unavailable")
	});

	app.config = config;
	app.config.useSecurity = false;

	//give a hook to the socket.io server to the messenger
	lib.messenger.io = io
	lib.messenger.start()

	routers.init(app, (err, res) => {
		if (err) {
			console.log("Error Loading Routers.")
			console.log(err);
			process.exit();
		} else {
			http.listen(config.http.port, function(){
				console.log('listening on *:',config.http.port);
			});
		}

		io.on('connection', function(socket){
			console.log('a user connected ', socket.id);
			
			if(typeof socket.handshake.session == "undefined") socket.handshake.session.user = {}
			if(!socket.handshake.session.user){ 
				console.log("new session")
				socket.handshake.session.myID = socket.id;
				socket.handshake.session.save();
				socket.emit("unauthenticated", {session : false})
			}else{
				//console.log(socket.handshake.session)
				socket.emit("authenticated", {"session" : socket.handshake.session})
			}

			socket.on("*", function(message){
				//we have the message so we need to figure out how to route it
				var myRoute = message.data[0].split("/");
				var req = {
					params : [myRoute[0], myRoute[1], message.data[1]],
					method : message.data[1].method,
					session : socket.handshake.session,
					lib : lib
				}
				
				var res = {
					json : function(data){
						var body = data;
						body.status = typeof data.status == "undefined" ? 200 : data.status
						socket.emit(message.data[0], {body : data, status : 200})
					},
					end : function(){
						// placeholder
					},
					sendStatus : function(status){
						console.log("whoops", status)
						socket.emit(myRoute.join("/"), {status : status})
					}
				}

				var next = function(err){
					// placeholder
				}
				routers.route(req, res, next)
			})
		});
	});
})

